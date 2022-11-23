import { Component } from "react";
import "./charList.scss";
import abyss from "../../resources/img/abyss.jpg";
import MarvelService from "../../services/MarvelService";

class CharList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            activeCard: 1,
        };
    }

    componentDidMount() {
        this.onCardsLoaded();
    }

    marvelServices = new MarvelService();

    onCardsLoaded = async () => {
        await this.marvelServices.getAllCharacters().then((res) =>
            this.setState({
                cards: [...res.data.results],
            })
        );
    };

    onClickCard = (i) => {
        this.setState({ activeCard: i });
    };

    render() {
        const { cards, activeCard } = this.state;
        const res = cards.map((item, i) => {
            return (
                <li
                    key={item.id}
                    className={
                        activeCard === i
                            ? "char__item char__item_selected"
                            : "char__item"
                    }
                    onClick={() => this.onClickCard(i)}
                >
                    <img
                        src={
                            item.thumbnail.path + "." + item.thumbnail.extension
                        }
                        alt={item.name}
                    />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });

        return (
            <div className="char__list">
                <ul className="char__grid">{res}</ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
