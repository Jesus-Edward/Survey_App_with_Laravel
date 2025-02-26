import { useState, useEffect } from "react";
import { userStateContext } from "../contexts/ContextProvider";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import {v4 as uuidv4} from "uuid";

export default function ({
    index = 0,
    question,
    addQuestion,
    deleteQuestion,
    questionChange,
}) {
    const [model, setModel] = useState({ ...question });
    const { questionTypes } = userStateContext();

    useEffect(() => {
        questionChange(model);
    }, [model]);

    function upperCaseFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function shouldHaveOptions(type = null) {
        type = type || model.type;
        return ['select', 'radio', 'checkbox'].includes(type)
    }

    function onTypeChange(ev) {
        const newModel = {
            ...model,
            type: ev.target.value,
        };

        if (!shouldHaveOptions(model.type) && shouldHaveOptions(ev.target.value)) {
            if (!model.data.options) {

                newModel.data = {
                    options: [
                        {uuid: uuidv4(), text: ''}
                    ]
                }
            }
        }
        setModel(newModel);
    }

    function addOption() {

        model.data.options.push({
            uuid: uuidv4(),
            text: ''
        });
        setModel({...model})
    }

    function deleteOption(op) {
        model.data.options = model.data.options.filter(option => option.uuid !== op.uuid);
        setModel({...model});
    }

    return (
        <div>
            <div className="flex justify-between mb-3">
                <h4>
                    {index + 1}. {model.question}
                </h4>
                <div className="flex items-center">
                    <button
                        type="button"
                        className="flex items-center text-xs py-1 px-3 mr-2
                        rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                        onClick={() => addQuestion(index + 1)}
                    >
                        <PlusIcon className="w-4" />
                        Add
                    </button>

                    <button
                        type="button"
                        className="flex items-center text-xs py-1 px-3 mr-2
                        rounded-sm border border-transparent text-red-500 hover:border-red-600 font-semibold"
                        onClick={() => deleteQuestion(question)}
                    >
                        <TrashIcon className="w-4" />
                        Delete
                    </button>
                </div>
            </div>
            <div className="flex gap-3 justify-between mb-3">
                {/* Question text */}
                <div className="flex-1">
                    <label
                        htmlFor="question"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Question
                    </label>
                    <input
                        type="text"
                        name="question"
                        id="question"
                        value={model.question}
                        onChange={(ev) =>
                            setModel({ ...model, question: ev.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                {/* Question text */}

                {/* Question Type */}
                <div>
                    <label
                        htmlFor="question"
                        className="block text-sm font-medium text-gray-700"
                    >
                        QuestionType
                    </label>
                    <select
                        id="questionType"
                        name="questionType"
                        value={model.type}
                        onChange={onTypeChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm
                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        {questionTypes.map((type) => {
                            return (
                                <option value={type} key={type}>
                                    {upperCaseFirst(type)}
                                </option>
                            );
                        })}
                    </select>
                </div>
                {/* Question Type */}
            </div>

            {/* Description */}
            <div>
                <div>
                    <label
                        htmlFor="question"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                </div>
                <textarea
                    name="questionDescription"
                    id="questionDescription"
                    typeof="text"
                    value={model.description}
                    onChange={(ev) =>
                        setModel({ ...model, description: ev.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
            </div>
            {/* Description */}

            <div>
                {shouldHaveOptions() && (
                    <div>
                        <h4 className="text-sm font-semibold mb-1 flex justify-between items-center">
                            Options
                            <button
                                type="button"
                                className="items-center text-sm py-1 px-2 rounded-sm
                                        text-white bg-gray-600 hover:bg-gray-700 mt-1.5"
                                onClick={addOption}

                            >
                                Add
                            </button>
                        </h4>
                        {model.data.options.length === 0 && (
                            <div className="text-xs text-gray-600 text-center py-3">
                                You don't have any options defined
                            </div>
                        )}
                        {model.data.options.length > 0 && (
                            <div>
                                {model.data.options.map((op, ind) => (
                                    <div key={op.uuid} className="flex items-center mb-1">
                                        <span className="w-6 text-sm">
                                            {ind + 1}.
                                        </span>
                                        <input
                                            type="text"
                                            value={op.text}
                                            className="w-full rounded-sm py-1 px-2
                                            text-sm border border-gray-300 focus:border-indigo-500"
                                            onInput={ev => {op.text = ev.target.value, setModel({...model})}}
                                        />
                                        <button
                                            type="button"
                                            className="w-6 h-6 rounded-full flex items-center text-sm border border-transparent transition-colors
                                          text-white hover:border-red-100"
                                          onClick={ev => deleteOption(op)}
                                        >
                                            <TrashIcon className="w-5 h-4 text-red-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* {model.type === "select" && <div></div>} */}
        </div>
    );
}
