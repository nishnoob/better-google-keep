export const CREATE_NOTE = "CREATE_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";

export const ARCHIVE_NOTE = "ARCHIVE_NOTE";
export const UNARCHIVE_NOTE = "UNARCHIVE_NOTE";

export const PIN_NOTE = "PIN_NOTE";
export const UNPIN_NOTE = "UNPIN_NOTE";

export const TOGGLE_MENU = "TOGGLE_MENU";
export const TOGGLE_ARCHIVES = "TOGGLE_ARCHIVES";

export const SELECT_NOTE = "SELECT_NOTE";
export const UNSELECT_NOTE = "UNSELECT_NOTE";

export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";

function reducer(
    state = {
        notes: [],
        isMenuOpen: true,
        showArchives: false,
        selectedNote: null,
        isDarkMode: false,
    },
    action
) {
    let newNotes = [];
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen,
            };
        case TOGGLE_ARCHIVES:
            return {
                ...state,
                showArchives: action.payload,
            };
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
        case EDIT_NOTE:
            let updatedSelectedNote = {};
            const updatedNotes = state.notes.map((item) => {
                if (item.id === action.payload.id) {
                    const newItem = {
                        ...item,
                        title: action.payload.title,
                        description: action.payload.description,
                    };
                    updatedSelectedNote = { ...item };
                    return newItem;
                }
                return item;
            });
            return {
                ...state,
                notes: updatedNotes,
                selectedNote: updatedSelectedNote,
            };
        case DELETE_NOTE:
            const filteredNotes = state.notes.filter(
                (item) => item.id !== action.payload.id
            );
            return {
                ...state,
                notes: filteredNotes,
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
        case SELECT_NOTE:
            return {
                ...state,
                selectedNote: action.payload,
            };
        case UNSELECT_NOTE:
            return {
                ...state,
                selectedNote: null,
            };
        case TOGGLE_DARK_MODE:
            return {
                ...state,
                isDarkMode: !state.isDarkMode,
            };
        default:
            return state;
    }
}

export default reducer;
