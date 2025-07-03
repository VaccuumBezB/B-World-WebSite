import React, { useEffect } from 'react';
import { createAnimatable } from 'animejs';
import { downloadTransition, startAnimation, listAnimation } from './index';

const path = `${process.env.PUBLIC_URL}/JSON/versions.json`;

class MainPage extends React.Component {

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad)
    }

    handleLoad() {
        setTimeout(() => { document.body.removeChild(document.getElementById('loader')); startAnimation(); }, 100)
    }


    render() {
        return (
            <div id="main-page" className="container">
                <div className="item panel">
                    {"«Всякий человек меньше самого прекрасного своего создания» (c) П. Валери"}
                </div>
                <div className="item panel">
                    {"«Едва ли есть высшее из наслаждений, как наслаждение творить» (c) Н. Гоголь"}
                </div>

                <div className="item card">
                    <div className="card2" id="rect">

                        <h3>Список версий</h3>
                        <p>скачайте любую версию игры</p>

                        <DownloadButton onPageChange={this.props.onPageChange} />

                    </div>
                </div>
            </div>
        );
    }
}

class VersionsList extends React.Component {
    state = {
        versions: [],
        error: null,
    };

    componentDidMount() {
        fetch(path)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                this.setState({ versions: data.versions });
            })
            .catch(error => {
                console.error('Не удалось загрузить версии:', error);
                this.setState({ error: `Не удалось загрузить версии: ${error.message}` });
            });
    }
    render() {
        const { versions, error } = this.state;

        if (error) {
            return (
                <div>
                    <code>
                        <ol>
                            <li><p className='red'>{error};</p></li>
                            <li></li>
                            <li>Вероятно, ваш браузер не может получить доступ к файлу <a className="link" href={path}>versions.json</a>;</li>
                        </ol>
                    </code>
                </div>);
        }

        if (versions.length === 0) {
            return <div>Загрузка</div>;
        }

        return (
            <div className='wrapper'>
                <div className='scroll-section'>
                    <ul>
                        {
                            versions.map(version => (
                                <VersionElement
                                    id={version.id}
                                    displayName={version.displayName}
                                    key={version.id}
                                />
                            ))
                        }
                    </ul>
                </div>
                <span className='handle'></span>
            </div>
        );
    }
}
class DownloadPage extends React.Component {
    render() {
        return (
            <div id="download-page">
                <h2>Выберите версию</h2>
                <p>для скачивания нажмите на карточку с версией</p>

                <VersionsList></VersionsList>
            </div>
        );
    }
}


const VersionElement = ({ id, displayName }) => {
    useEffect(() => {
        listAnimation();
    }, [])

    return (
        <li>
            <div className='version-card'>
                <a href={id}>
                    <div className='version-container'>
                        <div className='effects'></div>
                        <div className='version'>
                            <h3>{displayName}</h3>
                        </div>
                    </div>
                </a>
            </div>
        </li >);
};

const DownloadButton = ({ onPageChange }) => {
    useEffect(() => {
        const animatable = createAnimatable('#dBtn', {
            x: 500,
            y: 500,

        });

        const onMouseMove = (e) => {
            const rect = document.getElementById('rect').getBoundingClientRect(); // Исправлено: без параметра
            const x_ = (e.clientX - rect.left - rect.width / 2) / 6;
            const y_ = (e.clientY - rect.top - rect.height / 2) / 12;
            animatable.x(x_);
            animatable.y(y_);
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <div className="sp">
            <button
                className="sparkle-button"
                id="dBtn"
                onClick={() => {
                    setTimeout(onPageChange, 700, 1); // Используем переданный метод
                    downloadTransition();
                }}
            >
                <span className="spark"></span>
                <span className="backdrop"></span>
                <span className="text">Скачать</span>
            </button>
            <div className="bodydrop"></div>
        </div>
    );
}

///////////////////////////////////////////
class Content extends React.Component {
    state = { page: 0 };

    //static switchPage() { const a = () => {this.setState( {page: 1} );} }
    handlePageChange = (page) => {
        this.setState({ page });
    }

    render() {
        return (
            <div className="App-content">
                {(this.state.page === 0) ?
                    <MainPage onPageChange={this.handlePageChange} /> :
                    <DownloadPage onPageChange={this.handlePageChange} />}
            </div>
        );
    }
}

export default Content;