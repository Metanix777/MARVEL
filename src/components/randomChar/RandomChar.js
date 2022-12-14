import { useState, useEffect } from "react";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "./../errorMessage/ErrorMessage";

const RandomChar = (props) => {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        updateChar();
    }, []);

    function onCharLoaded(char) {
        setChar(char);
        setLoading(false);
    }

    function onCharLoading() {
        setLoading(true);
    }

    function onError() {
        setLoading(false);
        setError(true);
    }

    const marvelServices = new MarvelService();

    function updateChar() {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        onCharLoading();
        marvelServices.getCharacter(id).then(onCharLoaded).catch(onError);
    }

    function onButtonClick() {
        updateChar();
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button className="button button__main" onClick={onButtonClick}>
                    <div className="inner">try it</div>
                </button>
                <img
                    src={mjolnir}
                    alt="mjolnir"
                    className="randomchar__decoration"
                />
            </div>
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    const styleImg =
        char.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ? { objectFit: "contain" }
            : null;

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={styleImg}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">
                    {name.length > 20 ? name.slice(0, 20) + "..." : name}
                </p>
                <p className="randomchar__descr">
                    {description
                        ? `${description.slice(0, 170)}...`
                        : "No description for this character"}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
