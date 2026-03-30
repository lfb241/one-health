import { types } from "mobx-state-tree";
import React from "react";
import { SearchEntityStore } from "./search-entity-store";

export const RootStore = types
    .model({
        searchEntityStore: types.optional(SearchEntityStore,{})
    })
    .actions((self) => ({

    }));
export const RootStoreContext = React.createContext(RootStore.create({}))