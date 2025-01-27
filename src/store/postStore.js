import create from 'zustand';

export const usePostStore = create((set) => ({
    posts: [],

    addPost: (image, description, username) =>
        set((state) => ({
            posts: [
                ...state.posts,
                { id: Date.now(), image, description, username, comments: [] },
            ],
        })),

    addComment: (postId, username, comment) =>
        set((state) => ({
            posts: state.posts.map((post) =>
                post.id === postId
                    ? { ...post, comments: [...post.comments, { username, comment }] }
                    : post
            ),
        })),
}));
