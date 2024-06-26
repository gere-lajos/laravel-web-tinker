<?php

namespace GereLajos\LaravelWebTinker;

use GereLajos\LaravelWebTinker\OutputModifiers\OutputModifier;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Application;
use Illuminate\Support\Benchmark;
use Illuminate\Support\Collection;
use Laravel\Tinker\ClassAliasAutoloader;
use Psy\Configuration;
use Psy\ExecutionLoopClosure;
use Psy\Shell;
use Symfony\Component\Console\Output\BufferedOutput;

class LaravelWebTinker
{
    /** @var BufferedOutput */
    protected $output;

    /** @var Shell */
    protected $shell;

    /** @var OutputModifier */
    protected $outputModifier;

    public function __construct(OutputModifier $outputModifier)
    {
        $this->output = new BufferedOutput();

        $this->shell = $this->createShell($this->output);

        $this->outputModifier = $outputModifier;
    }

    public function execute(string $phpCode): string
    {
        $phpCode = $this->removeComments($phpCode);

        $this->shell->addInput($phpCode);

        $closure = new ExecutionLoopClosure($this->shell);

        $runtime = Benchmark::measure(fn () => $closure->execute());
        $output = $this->cleanOutput($this->output->fetch());

        return $this->outputModifier->modify($output, $runtime);
    }

    protected function createShell(BufferedOutput $output): Shell
    {
        $config = new Configuration([
            'updateCheck' => 'never',
            'configFile' => config('web-tinker.config_file') !== null ? base_path().'/'.config('web-tinker.config_file') : null,
        ]);

        $config->setHistoryFile(defined('PHP_WINDOWS_VERSION_BUILD') ? 'null' : '/dev/null');

        $config->getPresenter()->addCasters([
            Collection::class => 'Laravel\Tinker\TinkerCaster::castCollection',
            Model::class => 'Laravel\Tinker\TinkerCaster::castModel',
            Application::class => 'Laravel\Tinker\TinkerCaster::castApplication',
        ]);

        $shell = new Shell($config);

        $shell->setOutput($output);

        $composerClassMap = base_path('vendor/composer/autoload_classmap.php');

        if (file_exists($composerClassMap)) {
            ClassAliasAutoloader::register($shell, $composerClassMap, config('tinker.alias', []), config('tinker.dont_alias', []));
        }

        return $shell;
    }

    public function removeComments(string $code): string
    {
        $tokens = collect(token_get_all("<?php\n".$code.'?>'));

        return $tokens->reduce(function ($carry, $token) {
            if (is_string($token)) {
                return $carry.$token;
            }

            $text = $this->ignoreCommentsAndPhpTags($token);

            return $carry.$text;
        }, '');
    }

    protected function ignoreCommentsAndPhpTags(array $token)
    {
        [$id, $text] = $token;

        if ($id === T_COMMENT) {
            return '';
        }
        if ($id === T_DOC_COMMENT) {
            return '';
        }
        if ($id === T_OPEN_TAG) {
            return '';
        }
        if ($id === T_CLOSE_TAG) {
            return '';
        }

        return $text;
    }

    protected function cleanOutput(string $output): string
    {
        $output = preg_replace('/(?s)(<aside.*?<\/aside>)|Exit: {2}Ctrl\+D/ms', '$2', $output);

        $output = preg_replace('/(?s)(<whisper.*?<\/whisper>)|INFO {2}Ctrl\+D\./ms', '$2', $output);

        return trim($output);
    }
}
