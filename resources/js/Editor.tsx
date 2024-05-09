import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import CodeIcon from "@/components/icons/CodeIcon"
import PlayIcon from "@/components/icons/PlayIcon"

export default function Editor() {
    return (
        <div className="grid min-h-screen w-full grid-cols-[1fr_1fr]">
            <div className="flex flex-col border-r bg-gray-900 border-gray-800">
                <div className="flex h-14 items-center justify-between border-b px-4 border-gray-800">
                    <div className="flex items-center gap-2">
                        <CodeIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-50">Laravel Web Tinker</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button className="h-8 w-8 hover:bg-gray-800" size="icon" variant="ghost">
                            <PlayIcon className="h-4 w-4 text-gray-400 hover:text-gray-50" />
                            <span className="sr-only">Run</span>
                        </Button>
                    </div>
                </div>
                <div className="flex-1 overflow-auto text-gray-400">
                    Almafa
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex h-14 px-5 items-center justify-between bg-gray-900 border-gray-800">
                    <span className="text-sm font-medium text-gray-50">Output</span>
                </div>
                <div className="flex-1 overflow-auto bg-slate-700">
                    <Card className="h-full w-full bg-slate-700 border-none">
                        <CardContent className="px-5 py-3">
                            <pre className="text-sm text-gray-400">
                                Output will appear here...
                                <div className="my-6"></div>
                                You can press <kbd>Ctrl + Enter</kbd> or <kbd>Cmd + Enter</kbd> to run the code.
                            </pre>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
