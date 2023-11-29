import { WEB_SITE } from "config";

export default async function Comments({ postSlug }: { postSlug: string }) {
	// `/blog/post-1`
	let comments = [];

	try {
		const commentsResult = await fetch(`${WEB_SITE}/api/comments/${postSlug}`, {
			next: { revalidate: 5 },
		});
		const response = await commentsResult.json();
		console.log(response);
		comments = response.comments.rows;
	} catch (err) {
		console.log(err);
	}

	return (
		<div>
			<h2>| Comments |</h2>
			<h3>Leave a comment: </h3>

			<form
				action={`/api/comments/${postSlug}`}
				method="POST"
				className="flex flex-col max-w-lg gap-2 text-slate-900"
			>
				<label htmlFor="username" className="text-white">
					Name:
				</label>
				<input type="text" name="username" />

				<label htmlFor="comment" className="text-white">
					Your comment:
				</label>
				<textarea name="comment" cols={30} rows={10} />

				<button type="submit" className="bg-zinc-200">
					Post Comment
				</button>
			</form>
			{comments.map(
				(comment: { id: string; content: string; username: string }) => {
					return (
						<li key={comment.id}>
							{comment.username} says...
							<br />
							{comment.content}
						</li>
					);
				}
			)}
		</div>
	);
}
