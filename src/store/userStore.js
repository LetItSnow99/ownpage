import { create } from 'zustand';

const useUserStore = create((set) => ({
    currentUser: null, // Dabartinis prisijungęs vartotojas
    users: [], // Registruotų vartotojų sąrašas

    // Registracijos funkcija
    registerUser: (user) =>
        set((state) => {
            const existingUser = state.users.find((u) => u.username === user.username);
            if (existingUser) {
                alert('Username already exists. Please choose a different one.');
                return state;
            }
            return {
                users: [...state.users, { ...user, id: Date.now() }],
            };
        }),

    // Prisijungimo funkcija
    login: (username, password) => {
        let foundUser = null;

        set((state) => {
            const user = state.users.find(
                (u) => u.username === username && u.password === password
            );

            if (user) {
                foundUser = user;
                return { currentUser: user };
            } else {
                alert('Invalid username or password.');
                return state;
            }
        });

        return foundUser;
    },

    // Atsijungimo funkcija
    logout: () =>
        set(() => ({
            currentUser: null,
        })),

    // Profilio atnaujinimo funkcija
    updateUser: (updatedData) =>
        set((state) => {
            const updatedUsers = state.users.map((user) =>
                user.username === state.currentUser.username
                    ? { ...user, ...updatedData }
                    : user
            );

            return {
                users: updatedUsers,
                currentUser: { ...state.currentUser, ...updatedData },
            };
        }),

    // Vartotojo ištrynimo funkcija
    deleteUser: (username, password) => {
        let result = null;

        set((state) => {
            const userIndex = state.users.findIndex(
                (u) => u.username === username && u.password === password
            );

            if (userIndex !== -1) {
                const updatedUsers = [...state.users];
                updatedUsers.splice(userIndex, 1);

                result = { success: true };
                return {
                    users: updatedUsers,
                    currentUser: null,
                };
            } else {
                result = { error: 'Invalid password. Cannot delete profile.' };
                return state;
            }
        });

        return result;
    },
}));

export { useUserStore };
