import { types, flow, Instance, getEnv, getSnapshot } from "mobx-state-tree";
import { Entity } from "./models/Entity";
import React from "react";
import { IGeneralSearchHistoryService, IGeneralSearchService } from "../../services";
import { MessageService } from "../../features/shared/messages";
import { SavedTextSearch } from "./models/SavedTextSearch";

type Env = {
    historyService: IGeneralSearchHistoryService;
    messageService: MessageService
    searchService: IGeneralSearchService
}

export const GeneralSearchStore = types.model({
    entities: types.array(Entity),  // optional?
    selectedEntities: types.array(types.reference(Entity)),
    isSearching: types.maybeNull(types.boolean),
    query: types.optional(types.string, ""),
    history: types.array(SavedTextSearch),
    isModalOpen: types.optional(types.boolean, false)
}).views(
    (self) => ({
        getEntitiesAsJSON() {
            return self.entities.map((entity) => getSnapshot(entity))
        }
        ,
        getSelectionAsJSON(): any {
            return self.selectedEntities.map((entity) => getSnapshot(entity))
        },
        getEntitiesOfType(type: string) {
            return self.entities.filter(e => e.type == type);
        },
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
            setIsSearching(isSearching: boolean): void {
                self.isSearching = isSearching;

            },
            setQuery(query: string): void {
                self.query = query;
            },

            setSelectedEntities(entities: any[]) {

                self.selectedEntities.clear()
                entities.forEach(propEntity => {
                    if (propEntity.id) {
                        self.selectedEntities.push(propEntity.id)
                    }
                })

            },

            setIsModalOpen(isModalOpen: boolean): void {
                self.isModalOpen = isModalOpen;

            },

            initHistory: flow(function* () {
                const { historyService, messageService } = getEnv<Env>(self);
                const data = yield historyService.getAllAsOptions(messageService);
                self.history = data;

            }),
            setHistory(history: Instance<typeof SavedTextSearch>[]): void {
                self.history.replace(history);
            },


            runQuery: flow(function* (): any {
                const { searchService, messageService, historyService } = getEnv<Env>(self);

                if (!self.isSearching && self.query) {
                    self.isSearching = true
                    const entities = yield searchService.findEntities(
                        self.query,
                        messageService!,
                    );
                    self.entities.replace(entities)
                    self.selectedEntities.replace([])
                    self.isSearching = false;
                    yield historyService.create(
                        { id: '0', query: self.query, datetime: '', results: self.entities },
                        messageService!,)

                    self.history = yield historyService.getAllAsOptions(messageService!)
                }
                self.selectedEntities.clear();

            }),
            deleteHistoryItem: flow(function* (item: Instance<typeof SavedTextSearch>): any {
                const { messageService, historyService } = getEnv<Env>(self);

                if (item.id != undefined)
                    yield historyService.delete(item.id);
                self.history = (
                    yield historyService.getAllAsOptions(
                        messageService!,
                    ))


            })

        })

    )

export const GeneralSearchStoreContext = React.createContext(GeneralSearchStore.create({}))