import * as ReactDOM from "react-dom";
import * as React from "react";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../components-refs";
import { Feed, FeedProp } from "./feed";
import { FeedStorage, StoredFeed } from "./../storage";

export class FeedList extends CustomComponent<{}, FeedListState> {

    feedComponents: Feed[];
    selectFeed: Feed;

    constructor() {
        super();

        this.state = {
            feeds: FeedStorage.storedContent.feeds.map(storedFeed => {
                return {
                    uuid: storedFeed.uuid,
                    title: storedFeed.title,
                    link: storedFeed.link,
                    articles: storedFeed.articles
                };
            })
        };

        ComponentsRefs.feedList = this;
    }

    render() {
        this.feedComponents = [];

        return (
            <ul className="rss list">
                {
                    this.state.feeds.map(feed => {
                        return <Feed
                            ref={feedComponent => {
                                if (feedComponent) this.feedComponents[this.feedComponents.length] = feedComponent;
                            } }
                            key={feed.uuid}
                            uuid={feed.uuid}
                            title={feed.title}
                            link={feed.link}
                            articles={feed.articles}
                            />;
                    })
                }
            </ul>
        );
    }

    isIdAlreadyUsed(uuid: string) {
        return !!this.state.feeds.find(feed => {
            return feed.uuid === uuid;
        });
    }

    addFeed(newFeed: FeedProp) {
        const newFeeds = this.state.feeds.slice(0);
        newFeeds[newFeeds.length] = newFeed;
        this.editState({ feeds: newFeeds });
    }

    fetchAll(){
        this.feedComponents.forEach(feedComponent => {
            feedComponent.fetch();
        });
    }

    getStoreValue(): StoredFeed[] {
        const storeValue = [];
        this.feedComponents.forEach(feedComponent => {
            storeValue[storeValue.length] = feedComponent.getStoreValue();
        });
        return storeValue;
    }
}

interface FeedListState {
    feeds: FeedProp[];
}
