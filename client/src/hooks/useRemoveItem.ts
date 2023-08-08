import { useState } from 'react';

export const useRemoveItem = (removeItemRequest: (id: number) => Promise<any>, fetchItemsRequest: () => void) => {
    const [removeItem, setRemoveItem] = useState<null | number>(null);
    const [showRemove, setShowRemove] = useState(false);

    const removeAccept = async () => {
        if (removeItem) {
            await removeItemRequest(removeItem);
        }
        await fetchItemsRequest();
        setShowRemove(false);
        setRemoveItem(null);
    };

    const removeCancel = () => {
        setShowRemove(false);
        setRemoveItem(null);
    };

    const handleRemove = async (id: number) => {
        setRemoveItem(id);
        setShowRemove(true);
    };

    return {
        removeItem,
        showRemove,
        setShowRemove,
        removeAccept,
        removeCancel,
        handleRemove,
    };
};