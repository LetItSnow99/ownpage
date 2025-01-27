import { create } from 'zustand';

export const usePostStore = create((set) => ({
    posts: [],

    // Pridėti naują įrašą
    addPost: (image, description, username) =>
        set((state) => ({
            posts: [
                ...state.posts,
                { id: Date.now(), image, description, username, comments: [], likes: [] },
            ],
        })),

    // Pridėti komentarą
    addComment: (postId, username, comment) =>
        set((state) => ({
            posts: state.posts.map((post) =>
                post.id === postId
                    ? { ...post, comments: [...post.comments, { username, comment }] }
                    : post
            ),
        })),

    // Pamėgti įrašą
    likePost: (postId, username) =>
        set((state) => ({
            posts: state.posts.map((post) =>
                post.id === postId && !post.likes.includes(username)
                    ? { ...post, likes: [...post.likes, username] }
                    : post
            ),
        })),

    // Ištrinti komentarą
    removeComment: (postId, commentIndex) =>
        set((state) => ({
            posts: state.posts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        comments: post.comments.filter((_, index) => index !== commentIndex),
                    }
                    : post
            ),
        })),

    // Ištrinti įrašą
    removePost: (postId) =>
        set((state) => ({
            posts: state.posts.filter((post) => post.id !== postId),
        })),

    // Ištrinti vartotojo duomenis
    removeUserData: (username) =>
        set((state) => ({
            posts: state.posts
                .filter((post) => post.username !== username)
                .map((post) => ({
                    ...post,
                    comments: post.comments.filter((c) => c.username !== username),
                    likes: post.likes.filter((like) => like !== username),
                })),
        })),
}));
