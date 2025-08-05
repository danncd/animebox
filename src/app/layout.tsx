import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Navigation from "@/components/navigation/Navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { getInitialUser } from "@/actions/auth/actions";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
	title: "Animebox",
	description: "See what others think of your favorite animes!",
	keywords: [
		"anime",
		"reviews",
		"anime reviews",
		"anime ratings",
		"animebox",
	],
	creator: "Animebox",
	twitter: {
		card: "summary_large_image",
		title: "Animebox",
		description: "See what others think of your favorite animes!",
		site: "@animebox",
		creator: "@animebox",
	},

	icons: {
		icon: "/favicon.ico",
	},
};

const poppins = Poppins({
	weight: "400",
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const initialUser = await getInitialUser();

	return (
		<html lang="en">
			<body
				suppressHydrationWarning
				className={` ${poppins.className} antialiased`}
			>
				<AuthProvider initialUser={initialUser}>
					<Navigation />
					<div className="min-h-[100vh] w-full mx-auto pt-22 text-gray-900 ">
						{children}
					</div>
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}
