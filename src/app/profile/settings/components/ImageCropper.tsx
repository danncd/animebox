"use client";

import { useState, useRef } from "react";
import ReactCrop, {
	centerCrop,
	makeAspectCrop,
	type Crop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";

const MAX_FILE_SIZE_MB = 3;
const MIN_FILE_SIZE_KB = 10;
const MIN_DIMENSION = 150;


function dataURLtoBlob(dataUrl: string): Blob {
	const [header, base64] = dataUrl.split(",");
	const mime = header.match(/:(.*?);/)?.[1] || "image/jpeg";
	const binary = atob(base64);
	const array = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		array[i] = binary.charCodeAt(i);
	}
	return new Blob([array], { type: mime });
}

type ImageCropperModal = {
	closeModal: () => void;
};

const ImageCropper = ({ closeModal }: ImageCropperModal) => {

	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const [imgSrc, setImgSrc] = useState("");
	const [crop, setCrop] = useState<Crop>();
	const [error, setError] = useState("");
	const imgRef = useRef<HTMLImageElement | null>(null);
	const [imageType, setImageType] = useState("image/jpeg");

	const { user, setUser } = useAuth();

	const supabase = createClient();

	const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const fileSizeKB = file.size / 1024;
		const fileSizeMB = file.size / (1024 * 1024);

		if (fileSizeKB < MIN_FILE_SIZE_KB) {
			alert("File is too small. Minimum size is 10KB.");
			return;
		}
		if (fileSizeMB > MAX_FILE_SIZE_MB) {
			alert("File is too large. Maximum size is 3MB.");
			return;
		}

		const mimeType = file.type;
		setImageType(mimeType);

		const reader = new FileReader();
		reader.onload = () => {
			const imageUrl = reader.result?.toString() || "";
			const imageElement = new Image();
			imageElement.src = imageUrl;

			imageElement.onload = () => {
				if (
					imageElement.naturalWidth < MIN_DIMENSION ||
					imageElement.naturalHeight < MIN_DIMENSION
				) {
					setError("Image must be at least 150 x 150 pixels");
					setImgSrc("");
					return;
				}
				setError("");
				setImgSrc(imageUrl);
			};
		};
		reader.readAsDataURL(file);
	};

	const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
		const { width, height } = e.currentTarget;
		imgRef.current = e.currentTarget;

		const side = Math.min(width, height);
		const x = (width - side) / 2;
		const y = (height - side) / 2;

		setCrop({
			unit: "px",
			width: side,
			height: side,
			x,
			y,
		});
	};

	const handleSave = async () => {
		if (!crop || !imgRef.current) return;

		const { data: userData, error: userError } =
			await supabase.auth.getUser();

		if (userError || !userData.user) {
			setError("You must be logged in to upload a profile picture.");
			return;
		}

		const userId = userData.user.id;

		const canvas = document.createElement("canvas");
		const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
		const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

		canvas.width = crop.width!;
		canvas.height = crop.height!;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.drawImage(
			imgRef.current,
			crop.x! * scaleX,
			crop.y! * scaleY,
			crop.width! * scaleX,
			crop.height! * scaleY,
			0,
			0,
			crop.width!,
			crop.height!,
		);

		const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
		const blob = dataURLtoBlob(dataUrl);

		const filePath = `${userId}/profile.jpeg`;

		const { data: publicUrlData } = supabase.storage
			.from("avatars")
			.getPublicUrl(filePath);

		const publicUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`;

		const { data, error } = await supabase.storage
			.from("avatars")
			.upload(filePath, blob, {
				cacheControl: "3600",
				upsert: true,
				contentType: "image/jpeg",
			});

		if (error) {
			console.error("Upload error:", error.message);
			setError("Failed to upload image");
			return;
		}

		const { error: updateError } = await supabase
			.from("profiles")
			.update({
				avatar_url: filePath,
				avatar_updated_at: new Date().toISOString(),
			})
			.eq("id", userId);

		if (updateError) {
			console.error("Profile update error:", updateError.message);
			setError("Failed to update profile");
			return;
		}

        if (!error && !updateError) {
            closeModal();
        }
		if (user && user.id && user.email) {
			setUser({
				id: user.id,
				email: user.email,
				name: user.name,
				username: user.username,
				avatar_url: publicUrl,
			});
		}

		window.location.reload();
	};

	return (
		<div className="flex flex-col gap-6">
			<label className="flex flex-col gap-1">
				<div className="flex justify-center">
					<Button
						color="gray"
						onClick={() => inputFileRef.current?.click()}
					>
						Choose Image
					</Button>
				</div>
				<input
					type="file"
					accept="image/*"
					className="hidden"
					ref={inputFileRef}
					onChange={onSelectFile}
				/>
			</label>

			{imgSrc && (
				<div className="flex flex-col items-center gap-3">
					<ReactCrop
						crop={crop}
						onChange={(c) => setCrop(c)}
						circularCrop
						keepSelection
						aspect={1}
						minWidth={MIN_DIMENSION}
					>
						<img
							src={imgSrc}
							alt="Uploaded"
							className="max-h-[70vh]"
							onLoad={onImageLoad}
						/>
					</ReactCrop>

					<Button
						onClick={handleSave}
						color="blue"
						className="!w-full mt-6"
					>
						Save
					</Button>
				</div>
			)}

			{error && <p className="text-red-600">{error}</p>}
		</div>
	);
};

export default ImageCropper;
