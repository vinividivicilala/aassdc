import { create } from "zustand";

const useCommentStore = create((set) => ({
    comments: [],
    setComments: (newComments) => set({ comments: newComments }),
    addComment: (comment) => set((state) => (
        { comments: [comment, ...state.comments], }
    )),
    addReply: (commentId, reply) => set((state) => {
        const updateComments = state.comments.map((comment) => {
            if (comment.id == commentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies || []), reply],
                };
            }
            return comment;
        });

        return { comments: updateComments };

    })

}));

export default useCommentStore;