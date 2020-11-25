export const CREATE_NOTE = "CREATE_NOTE";
export const ARCHIVE_NOTE = "ARCHIVE_NOTE";
export const UNARCHIVE_NOTE = "UNARCHIVE_NOTE";
export const PIN_NOTE = "PIN_NOTE";
export const UNPIN_NOTE = "UNPIN_NOTE";

function reducer(state = { notes: [] }, action) {
    let newNotes = [];
    switch (action.type) {
        case CREATE_NOTE:
            return {
                ...state,
                notes: [
                    ...state.notes,
                    {
                        id: action.payload.id,
                        title: action.payload.title,
                        description: action.payload.description,
                    },
                ],
            };
        case ARCHIVE_NOTE:
            newNotes = state.notes.map((noteItem) => {
                if (noteItem.id === action.payload.id) {
                    return { ...noteItem, isArchived: true };
                } else {
                    return noteItem;
                }
            });
            return {
                ...state,
                notes: newNotes,
            };
        case UNARCHIVE_NOTE:
            newNotes = state.notes.map((noteItem) => {
                if (noteItem.id === action.payload.id) {
                    return { ...noteItem, isArchived: false };
                } else {
                    return noteItem;
                }
            });
            return {
                ...state,
                notes: newNotes,
            };
        case PIN_NOTE:
            newNotes = state.notes.map((noteItem) => {
                if (noteItem.id === action.payload.id) {
                    return { ...noteItem, isPinned: true };
                } else {
                    return noteItem;
                }
            });
            return {
                ...state,
                notes: newNotes,
            };
        case UNPIN_NOTE:
            newNotes = state.notes.map((noteItem) => {
                if (noteItem.id === action.payload.id) {
                    return { ...noteItem, isPinned: false };
                } else {
                    return noteItem;
                }
            });
            return {
                ...state,
                notes: newNotes,
            };
        default:
            return state;
    }
}

export default reducer;
