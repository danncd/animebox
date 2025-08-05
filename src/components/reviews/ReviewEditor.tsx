
import React from "react";
import Editor from "@/components/ui/Editor";

type ReviewEditorProps = {
	content: string;
	onChange: (content: string) => void;
};

const ReviewEditor = ({ content, onChange }: ReviewEditorProps) => (
	<div className="w-full flex flex-col gap-4">
		<Editor content={content} onChange={onChange} />
	</div>
);

export default ReviewEditor;
