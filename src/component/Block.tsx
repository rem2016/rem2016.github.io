import React from 'react';
import "./Block.css";

interface BlockProps {
    link?: string;
    image: string;
    width?: number;
    height?: number;
    children: any;
}

class Block extends React.Component {
    props: BlockProps;
    state: {smallScreen: boolean};
    constructor(props: BlockProps) {
        super(props);
        this.props = props;
        this.state = {smallScreen: false}
    }

    componentDidMount(){
        window.addEventListener('resize', ()=>{
            if (window.innerWidth < 520 && !this.state.smallScreen){
                this.setState({smallScreen: true});
            }
            if (window.innerWidth >= 520 && this.state.smallScreen){
                this.setState({smallScreen: false});
            }
        })
    }

    render() {
        const { image, width = 120, height = 120, children } = this.props;
        const {smallScreen} = this.state;
        return (
            <div className="dis_block">
                <div style={{width, height}}>
                    <img src={image} style={{ width, height, display: smallScreen? 'block':'inline-block' }} />
                </div>
                <div className="dis_children">
                    {children}
                </div>
            </div>
        );

    }
}

class ProjectBlock extends Block {
    props: BlockProps;
    constructor(props: BlockProps) {
        super(props);
        this.props = props;
    }

    render() {
        const { link, image, width = 220, height = 220, children } = this.props;
        const {smallScreen} = this.state;
        return (
            <div className="dis_block">
                <div style={{width, height}}>
                    {
                        link ? (
                            <a href={link} target="_blank">
                                <img src={image} style={{
                                    height,
                                    width,
                                    display: smallScreen ? 'block' : 'inline-block',
                                }} />
                            </a>
                        ) : (
                                <img src={image} style={{
                                    height,
                                    width,
                                    display: smallScreen ? 'block' : 'inline-block',
                                }} />
                            )
                    }
                </div>
                <div className="dis_children">
                    {children}
                </div>
            </div>
        );

    }
}

export { Block, ProjectBlock };