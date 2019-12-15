import React from 'react';
import './Navigator.css';
import img from '../res/me.jpg';
import draw_img from '../res/me1.jpg';
import {Icon} from 'antd';
import Typed from 'react-typed';

interface Item {
    title: string;
    href: string;
}

interface Props {
    items: Item[];
    hide?: boolean;
}

interface ContactProps {
    href: string;
    alt: string;
}

const Contact = function (props: ContactProps) {
    const {href, alt} = props;
    return (
        <div 
            style={{
                display: 'inline-block',
                margin: 8
            }}
        >
            <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon
                    type={alt}
                    theme="filled" 
                    className="contact-icon"
                    />
            </a>
        </div>
    )
}

class Navigator extends React.Component {
    props: Props;
    item_ref: React.RefObject<HTMLDivElement>;
    state: {chosenIndex: number, imgLeft: number};

    constructor(props: Props) {
        super(props);
        this.props = props;
        this.item_ref = React.createRef();
        this.state = {chosenIndex: 0, imgLeft: 0};
    }

    setIndex(index: number) {
        this.setState({chosenIndex: index});
    }

    render() {
        const { items, hide = false } = this.props;
        const { chosenIndex, imgLeft } = this.state;
        const item = this.item_ref.current;
        let height = 12;
        if (item){
            const child = item.children[0]
            height += child.clientHeight;
        }

        return (
            <div className="nav" style={{ marginLeft: hide ? -300 : 0 }}>
                <svg style={{height: 120, width: 120, margin: '0 auto', display: 'block'}} width="120" height="120" 
                    onMouseEnter={()=>{this.setState({imgLeft: 20})}}
                    onMouseLeave={()=>{this.setState({imgLeft: 0})}}
                    onClick={()=>{this.setState({imgLeft: 120})}}
                >
                    <mask id="myMask">
                        <circle cx="60" cy="60" r="60" fill="white"/>
                    </mask>
                    <image width="120" height="120" href={img} mask="url(#myMask)" />
                    <image id="svg-img" x={120 - imgLeft} width="120" height="120" 
                        onMouseEnter={()=>{this.setState({imgLeft: 120})}}
                        onMouseLeave={()=>{this.setState({imgLeft: 0})}}
                        href={draw_img} mask="url(#myMask)"/>
                    <circle cx="60" cy="60" r="59" strokeWidth="2" stroke="white" fill="none"/>
                </svg>
                <p className="username">Zixuan Chen</p>
                <p><span className="role">
                    <Typed
                        strings={[
                            'Front-End Dev',
                            'Algorithm Engineer',
                            'AIer',
                            'Software Engineer',
                            'Designer',
                        ]}
                        typeSpeed={40}
                        backSpeed={40}
                        backDelay={2000}
                        loop={true}
                    />
                </span></p>

                <div style={{ height: 0, borderBottom: '1px solid rgba(0, 0, 0, 0.2)', margin: 40 }} />

                <div style={{ position: 'relative' }} ref={this.item_ref}>
                    {
                        items.map((item, index) => {
                            return <div
                                key={item.href}
                                className="nav-item"
                                onClick={() => {
                                    let a = document.getElementById(item.href);
                                    if (a) {
                                        a.scrollIntoView({ behavior: 'smooth' });
                                        this.setState({chosenIndex: index});
                                    }
                                }}
                            >
                                <span>{item.title}</span>
                            </div>
                        })
                    }
                    <div className="nav-bar" style={{top: Math.floor(chosenIndex * height)}} />
                </div>

                <div style={{ height: 0, borderBottom: '1px solid rgba(0, 0, 0, 0.2)', margin: 40 }} />

                <div className="contact">
                    <Contact alt="github" href="https://github.com/zxch3n"/>
                    <Contact alt="linkedin" href="https://www.linkedin.com/in/z1xuanch3n/" />
                    <Contact alt="mail" href="mailto:remch183@outlook.com" />
                </div>
            </div>
        );
    }
}

export default Navigator;
