import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import CodeIcon from "@/components/icons/CodeIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { php } from "@codemirror/lang-php";
import { githubDark } from "@uiw/codemirror-theme-github";
import { historyField } from "@codemirror/commands";
import axios from "axios";
import React, { useState } from "react";
import parse from "html-react-parser";
import TrashIcon from "./components/icons/TrashIcon";

const stateFields = { history: historyField };
const editorStateKey = "editorState";
const editorValueKey = "editorValue";
const selectedTabKey = "selectedTab";

export default function Editor({ path }: { path: string }) {
    const [output, setOutput] = useState("");
    const [tabs, setTabs] = useState(
        Object.keys(
            JSON.parse(localStorage.getItem(editorValueKey) || "{}"),
        ).map(Number),
    );
    const [activeTab, setActiveTab] = useState(
        parseInt(localStorage.getItem(selectedTabKey) || "1"),
    );
    const [value, setValue] = useState(tabValueInStorage(activeTab) || "");

    const serializedState = localStorage.getItem(editorStateKey);

    if (tabs.length === 0) {
        addTab();
    }

    function tabValueInStorage(
        tabIndex: number,
        value: string | null | undefined = undefined,
    ) {
        const storedValueString = localStorage.getItem(editorValueKey) || "{}";
        let storedValue;

        try {
            storedValue = JSON.parse(storedValueString);
        } catch (error) {
            console.error("Error parsing JSON from localStorage:", error);
            storedValue = {};
        }

        if (value === undefined) {
            return storedValue[tabIndex];
        }

        if (value === null) {
            delete storedValue[tabIndex];
        } else {
            storedValue[tabIndex] = value;
        }

        try {
            localStorage.setItem(editorValueKey, JSON.stringify(storedValue));
        } catch (error) {
            console.error("Error stringifying JSON for localStorage:", error);
        }
    }

    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.code === "Enter" && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            sendCurrentCode();
        }
    }

    function sendCurrentCode() {
        const code = tabValueInStorage(activeTab);

        if (code === "") {
            return;
        }

        axios
            .post(path, { code })
            .then((result) => {
                setOutput(result.data);
            })
            .catch((error) => {
                console.error("Error executing code:", error);
            });
    }

    function handleChange(value: string, viewUpdate: ViewUpdate) {
        tabValueInStorage(activeTab, value);

        const state = viewUpdate.state.toJSON(stateFields);
        localStorage.setItem(editorStateKey + activeTab, JSON.stringify(state));
    }

    function addTab() {
        const tabIndex = tabs.length ? tabs[tabs.length - 1] + 1 : 1;
        setTabs([...tabs, tabIndex]);
        selectTab(tabIndex);
    }

    function selectTab(tabIndex: number) {
        setActiveTab(tabIndex);
        setValue(tabValueInStorage(tabIndex));
        localStorage.setItem(selectedTabKey, tabIndex.toString());
    }

    function deleteTab(tabIndex: number) {
        const newTabs = tabs.filter((tab) => tab !== tabIndex);
        setTabs(newTabs);
        tabValueInStorage(tabIndex, null);

        if (activeTab === tabIndex) {
            selectTab(newTabs[newTabs.length - 1]);
        }
    }

    return (
        <div className="grid min-h-screen w-full grid-cols-[1fr_1fr]">
            <div className="flex flex-col border-r bg-gray-900 border-gray-800">
                <div className="flex h-14 items-center justify-between border-b px-4 border-gray-800">
                    <div className="flex items-center gap-2">
                        <CodeIcon className="h-5 w-5 mr-2 text-gray-400" />
                        <span className="text-lg font-medium text-gray-50">
                            Laravel Web Tinker
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            className="h-8 w-8 hover:bg-gray-800"
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                                sendCurrentCode();
                            }}
                        >
                            <PlayIcon className="h-4 w-4 text-gray-400 hover:text-gray-50" />
                            <span className="sr-only">Run</span>
                        </Button>
                    </div>
                </div>
                <div className="border-b border-gray-800">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`py-2 px-4 hover:bg-gray-800 ${tab === activeTab ? "text-white bg-gray-700" : "text-gray-400"}`}
                            onClick={() => selectTab(tab)}
                        >
                            # {tab}{" "}
                            <button
                                className="ml-2 text-red-400"
                                onClick={() => deleteTab(tab)}
                            >
                                <TrashIcon className="h-3 w-3 text-gray-400 hover:text-red-400" />
                            </button>
                        </button>
                    ))}
                    <button
                        className="py-2 px-4 text-gray-400"
                        onClick={() => addTab()}
                    >
                        +
                    </button>
                </div>
                <div className="flex-1 overflow-auto text-gray-400">
                    <CodeMirror
                        onKeyDown={(event) => handleKeyDown(event)}
                        height="100%"
                        theme={githubDark}
                        extensions={[
                            php({
                                plain: true,
                            }),
                        ]}
                        autoFocus={true}
                        basicSetup={{
                            allowMultipleSelections: true,
                            tabSize: 4,
                            bracketMatching: true,
                            autocompletion: true,
                            rectangularSelection: true,
                            highlightActiveLine: true,
                            syntaxHighlighting: true,
                        }}
                        className="h-full"
                        value={value}
                        initialState={
                            serializedState
                                ? {
                                      json: JSON.parse(serializedState || ""),
                                      fields: stateFields,
                                  }
                                : undefined
                        }
                        onChange={(value, viewUpdate) =>
                            handleChange(value, viewUpdate)
                        }
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex h-14 px-5 items-center justify-between bg-gray-900 border-gray-800">
                    <span className="text-sm font-medium text-gray-50">
                        Output
                    </span>
                </div>
                <div className="flex-1 overflow-auto bg-slate-700">
                    <Card className="h-full w-full bg-slate-700 text-gray-200 border-none">
                        <CardContent className="px-5 py-3 font-mono text-sm">
                            <pre>
                                <code>
                                    {(output && parse(output)) || (
                                        <span className="text-gray-400">
                                            Output will appear here...
                                            <div className="my-6"></div>
                                            You can press{" "}
                                            <kbd>Ctrl + Enter</kbd> or{" "}
                                            <kbd>Cmd + Enter</kbd> to run the
                                            code.
                                        </span>
                                    )}
                                </code>
                            </pre>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
