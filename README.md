# reddit-export-saved-posts
A very simple way to export your saved posts to `.md` format.

# Howto

1. Clone this repository.
2. [Follow the steps here](https://github.com/reddit/reddit/wiki/OAuth2-Quick-Start-Example) to get a bearer token, which looks like this: `bearer J1qK1c18UUGJFAzz9xnH56584l4`.
3. Open the `export.html` file, open the Javascript console, and type `fetchSavedPosts(null, *bearer token*, *your username*)`.
4. If everything is working, your browser will start downloading a crapton of files: your saved posts.
5. You can open these files in your favourite text editor, or upload them to Github / Gitlab / Bitbucket, which have a native viewer for Markdown files.
