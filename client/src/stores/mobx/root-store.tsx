import { types } from "mobx-state-tree";
import React from "react";
import { GeneralSearchStore } from "./general-search-store";
import { dependencyFactory } from "../../features/shared/injection";
import { SERVICES } from "../../services";

export const RootStore = types
    .model({
       generalSearchStore: types.optional(GeneralSearchStore,{}),
      
      })
    .actions((self) => ({

    }));
export const RootStoreContext = React.createContext(RootStore.create({}, {
  searchService: dependencyFactory.get(SERVICES.IGeneralSearchService),
  historyService: dependencyFactory.get(SERVICES.IGeneralSearchHistoryService),
  messageService: dependencyFactory.get(SERVICES.MessageService)
}))