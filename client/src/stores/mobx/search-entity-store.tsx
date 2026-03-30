import { types, flow, Instance } from "mobx-state-tree";
import { Entity } from "./models/Entity";
import React from "react";
import { IGeneralSearchService, SERVICES } from "../../services";
import { dependencyFactory } from "../../features/shared/injection";
import { ToastMessageService } from "../../features/shared/messages/toast-message-service";
import { Toast } from "primereact/toast";

export const SearchEntityStore = types.model({
    entities: types.array(Entity),  // optional?
    selectedEntities: types.array(Entity),
    isSearching: types.maybeNull(types.boolean),
    query: types.maybeNull(types.string),
    history: types.array(types.string)
}).views(
    (self) => ({
        getEntitiesAsJSON() {
            return self.entities.map((entity) => {
                return {
                    id: entity.id,
                    type: entity.type,
                    labels: entity.labels,
                    properties: entity.properties,
                    references: entity.references,
                    synonyms: entity.synonyms,
                    color: entity.color,
                    name: entity.name,

                }
            })
        },
        getEntitiesOfType(type: string) {
            return self.entities.filter(e => e.type == type);
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

            setSelectedEntities(entities: Instance<typeof Entity>[]): void {
                self.selectedEntities.replace(entities);
            },


            fetchEntities: flow(function* (): any {

                const searchService = dependencyFactory.get<IGeneralSearchService>(
                    SERVICES.IGeneralSearchService,
                );

                const toastRef = React.createRef<Toast>();
                const messageService = new ToastMessageService(toastRef);

                if (!self.isSearching && self.query) {
                    self.isSearching = true
                    const entities = yield searchService.findEntities(
                        self.query,
                        messageService
                    );
                    self.entities.replace(entities)
                    self.selectedEntities.replace([])
                    self.isSearching = false;
                }

            })

        })

    )

export const SearchEntityStoreContext = React.createContext(SearchEntityStore.create({}))


/* const runQuery = async () => {
    if ((!searching || searching === null) && query) {
        setSearching(true);
        const elements = await searchService.findEntities(
            query,
            messageService!,
        );
        setElements(elements);
        setSelectedElements([]);
        setSearching(false);
        await historyService.create(
            { id: '0', query: query, datetime: '', results: elements },
            messageService!,
        );
        setHistory(await historyService.getAllAsOptions(messageService!));

    }
}; */