import { types } from "mobx-state-tree";
import React from "react";
import { SearchEntityStore } from "./search-entity-store";
import { dependencyFactory } from "../../features/shared/injection";
import { SERVICES } from "../../services";
import { SearchHistoryStore } from "./search-history.store";

export const RootStore = types
    .model({
        searchEntityStore: types.optional(SearchEntityStore,{}),
        SearchHistoryStore: types.optional(SearchHistoryStore,{})
      
      })
    .actions((self) => ({

    }));
export const RootStoreContext = React.createContext(RootStore.create({}, {
  searchService: dependencyFactory.get(SERVICES.IGeneralSearchService),
  historyService: dependencyFactory.get(SERVICES.IGeneralSearchHistoryService),
  messageService: dependencyFactory.get(SERVICES.MessageService)
}))