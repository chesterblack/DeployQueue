import Image from "next/image";
import { auth } from "../auth";

export default async function LoggedInBar() {
	const session = await auth();

	if ( !session || !session.user ) {
		return null;
	}

	return (
		<div className="logged-in-bar">
			<Image
				src={ session.user.image ?? '#' }
				width={ 40 }
				height={ 40 }
				alt={ session.user.name ?? session.user.email ?? session.user.id ?? 'someone?' }
			/>
			<span>Logged in as </span>
			<span className="github-username">{ session?.user?.name }</span>
		</div>
	);
}