import { Component } from "react";
import "./charList.scss";
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
        await this.marvelServices.getAllCharacters().then((cards) =>
            this.setState({
                cards,
            })
        );
    };

    onClickCard = (i, id) => {
        this.setState({ activeCard: i });
        this.props.onCharSelected(id);
    };

    render() {
        const { cards, activeCard } = this.state;
        const res = cards.map((item, i) => {
            const styleImg =
                item.thumbnail ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                    ? { objectFit: "contain" }
                    : null;

            return (
                <li
                    key={item.id}
                    className={
                        activeCard === i
                            ? "char__item char__item_selected"
                            : "char__item"
                    }
                    onClick={() => this.onClickCard(i, item.id)}
                >
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={styleImg}
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
