import update from 'immutability-helper';
import type { CSSProperties } from 'react';
import { Component } from 'react';

import { Card } from './DnDItem';

import FakeData from '../../../data/mockData.json';

const fakeDataArray = FakeData.results;

const style: CSSProperties = {
    width: 400,
};

interface CardItem {
    id: number;
    imageUrl: string;
    imageCategory: string;
}

export interface CardState {
    cardsById: Record<string, CardItem>;
    cardsByIndex: CardItem[];
}

function buildCardData() {
    const cardsById: Record<string, CardItem> = {};

    const cardsByIndex: CardItem[] = fakeDataArray.map((card, index) => {
        const newCard: CardItem = {
            id: card.id,
            imageUrl: card.imageUrl,
            imageCategory: card.imageCategory,
        };
        cardsById[newCard.id] = newCard;
        return newCard;
    });

    return {
        cardsById,
        cardsByIndex,
    };
    
}

export interface ContainerProps {}

export class Container extends Component<
    ContainerProps,
    Record<string, unknown>
> {
    private requestedFrame: number | undefined;
    private cardState: CardState = buildCardData();

    public constructor(props: ContainerProps) {
        super(props);
        this.state = STATE;
    }

    public componentWillUnmount(): void {
        if (this.requestedFrame !== undefined) {
            cancelAnimationFrame(this.requestedFrame);
        }
    }

    public render(): JSX.Element {
        const { cardsByIndex } = this.cardState;

        return (
            <>
                <div style={style}>
                    {cardsByIndex.map((card) => (
                        <Card
                            key={card.id}
                            id={card.id}
                            imageCategory={card.imageCategory}
                            imageUrl={card.imageUrl}
                            moveCard={this.moveCard}
                        />
                    ))}
                </div>
            </>
        );
    }

    private moveCard = (id: number, afterId: number): void => {
        const { cardsById, cardsByIndex } = this.cardState;

        const card = cardsById[id] as CardItem;
        const afterCard = cardsById[afterId] as CardItem;
        const cardIndex = cardsByIndex.indexOf(card);
        const afterIndex = cardsByIndex.indexOf(afterCard);
        this.cardState = update(this.cardState, {
            cardsByIndex: {
                $splice: [
                    [cardIndex, 1],
                    [afterIndex, 0, card],
                ],
            },
        });
        this.scheduleUpdate();
    };

    private scheduleUpdate() {
        if (!this.requestedFrame) {
            this.requestedFrame = requestAnimationFrame(this.drawFrame);
        }
    }

    private drawFrame = (): void => {
        this.setState(STATE);
        this.requestedFrame = undefined;
    };
}

const STATE = {};
