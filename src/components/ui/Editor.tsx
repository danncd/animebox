"use client";

import { useEffect } from "react";
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

type EditorProps = {
	content: string;
	onChange: (html: string) => void;
};

export default function Editor({ content, onChange }: EditorProps) {
	const editor = useEditor({
		extensions: [StarterKit, Underline],
		content,
		editorProps: {
			attributes: {
				class: "max-h-[50rem] min-h-[max(20rem,calc(100vh-26rem))] focus:outline-none p-3 rounded-md border border-gray-300 prose",
			},
		},
		immediatelyRender: false,
		onUpdate({ editor }) {
			onChange(editor.getHTML());
		},
	});

	const editorState = useEditorState({
		editor,
		selector: (ctx) => {
			const instance = ctx.editor;
			return {
				isBold: instance?.isActive("bold") ?? false,
				canBold: instance?.can().chain().toggleBold().run() ?? false,
				isItalic: instance?.isActive("italic") ?? false,
				canItalic:
					instance?.can().chain().toggleItalic().run() ?? false,
				isUnderline: instance?.isActive("underline") ?? false,
				canUnderline:
					instance?.can().chain().toggleUnderline().run() ?? false,
				isStrike: instance?.isActive("strike") ?? false,
				canStrike:
					instance?.can().chain().toggleStrike().run() ?? false,
			};
		},
	});

	useEffect(() => {
		if (editor && content !== editor.getHTML()) {
			editor.commands.setContent(content);
		}
	}, [content, editor]);

	if (!editor || !editorState) return null;

	return (
		<div className="flex flex-col gap-6">
			<div className="flex gap-2.5">
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editorState.canBold}
					className={`
                                    cursor-pointer px-3 py-1 rounded-full text-sm font-[550] transition-all duration-200 ease-in-out 
                                    ${
										editorState.isBold
											? "bg-blue-600 text-white"
											: "bg-gray-200 text-gray-800"
									}
                                `}
				>
					Bold
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editorState.canItalic}
					className={`
                                    cursor-pointer px-3 py-1 rounded-full text-sm font-[550] transition-all duration-200 ease-in-out 
                                    ${
										editorState.isItalic
											? "bg-blue-600 text-white"
											: "bg-gray-200 text-gray-800"
									}
                                `}
				>
					Italic
				</button>
				<button
					onClick={() => editor.chain().focus().toggleStrike().run()}
					disabled={!editorState.canStrike}
					className={`
                                    cursor-pointer px-3 py-1 rounded-full text-sm font-[550] transition-all duration-200 ease-in-out 
                                    ${
										editorState.isStrike
											? "bg-blue-600 text-white"
											: "bg-gray-200 text-gray-800"
									}
                                `}
				>
					Strike
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleUnderline().run()
					}
					disabled={!editorState.canUnderline}
					className={`
                                    cursor-pointer px-3 py-1 rounded-full text-sm font-[550] transition-all duration-200 ease-in-out 
                                    ${
										editorState.isUnderline
											? "bg-blue-600 text-white"
											: "bg-gray-200 text-gray-800"
									}
                                `}
				>
					Underline
				</button>
			</div>
			<EditorContent editor={editor} />
		</div>
	);
}
