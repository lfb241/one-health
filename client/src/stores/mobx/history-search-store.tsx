import { types, flow, Instance, getEnv } from "mobx-state-tree";
import React from "react";
import { IGeneralSearchHistoryService, IGeneralSearchService } from "../../services";
import { MessageService } from "../../features/shared/messages";
import { SavedTextSearch } from "./models/SavedTextSearch";

type Env = {
    historyService: IGeneralSearchHistoryService;
    messageService: MessageService
    searchService: IGeneralSearchService
}

export const HistorySearchStore = types.model({

    history: types.array(SavedTextSearch),

}).views(
    (self) => ({
        getHistorySize() {
            return self.history.length;
        },
        getHistoryAsJSON() {
            return self.history.map((e) => {
                return {
                    id: e.id,
                    datetime: e.datetime,
                    query: e.query,
                    results: e.results
                }
            })

        }

    }))
    .actions(
        (self) => ({

            initHistory: flow(function* () {
                const { historyService, messageService } = getEnv<Env>(self);
                const data = yield historyService.getAllAsOptions(messageService);
                self.history = data;

            }),
            setHistory(history: Instance<typeof SavedTextSearch>[]): void {
                self.history.replace(history);
            },

            deleteHistoryItem: flow(function* (item: Instance<typeof SavedTextSearch>): any {
                const { messageService, historyService } = getEnv<Env>(self);

                if (item.id != undefined)
                    yield historyService.delete(item.id);
                self.history = (
                    yield historyService.getAllAsOptions(
                        messageService!,
                    ))
            }),
            clearHistory: flow(function* (): any {
                const { messageService, historyService } = getEnv<Env>(self);

                for (const item of self.history) {
                    if (item.id != undefined) {
                        yield historyService.delete(item.id);
                    }
                }

                self.history = yield historyService.getAllAsOptions(messageService!);


            }),
        })



    )

export const HistorySearchStoreContext = React.createContext(HistorySearchStore.create({}))