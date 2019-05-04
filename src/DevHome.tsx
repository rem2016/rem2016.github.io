
import React from 'react';
import Navigator from './component/Navigator';
import { Block, ProjectBlock } from './component/Block';
import './Home.css';
import more_icn from './res/nav.svg';
import whu_icon from './res/whu.jpg';
import ms_icon from './res/microsoft.jpeg';
import helmet from './res/ih_pj.png';
import fudan_icon from './res/fudan.png';
import poicare from './res/poicare.png';
import xiaom from './res/xiaom.jpg';
import { Row, Col } from 'antd';


const items = [
  { href: 'about', title: 'About' },
  { href: 'education', title: 'Education' },
  { href: 'work-experience', title: 'Work Experience' },
  { href: 'projects', title: 'Projects' },
  { href: 'honors', title: 'Honors' },
  { href: 'personal', title: 'Personal' },
];


class DevHome extends React.Component {
  state: { show_nav: boolean, hide_menu: boolean };
  nav: React.RefObject<Navigator>;
  blocks: React.RefObject<HTMLDivElement>[];
  smallScreen: boolean;
  prevY: number;


  constructor(props: React.Props<any>) {
    super(props);
    this.state = {
      show_nav: false,
      hide_menu: false
    }

    this.nav = React.createRef();
    this.blocks = items.map(() => React.createRef());
    this.smallScreen = false;
    this.prevY = 0;
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  }

  onResize = () => {
    const w = document.documentElement.clientWidth;
    if (w >= 768) {
      this.setState({ show_nav: true });
      this.smallScreen = false;
    } else {
      this.setState({ show_nav: false });
      this.smallScreen = true;
    }

    this.onScroll();
  }

  onScroll = () => {
    const v = this.getCurrentDisplayElement();
    if (v != null && this.nav.current) {
      this.nav.current.setIndex(v);
    }

    var isquirks = document.compatMode !== 'BackCompat';
    var page = isquirks ? document.documentElement : document.body;
    var y = page.scrollTop;
    if (y > this.prevY && y > 10) {
      this.setState({ hide_menu: true });
    } else {
      this.setState({ hide_menu: false });
    }
    this.prevY = y;
  };

  onSmallScreenOutsideNavClick = () => {
    if (!this.smallScreen || !this.state.show_nav) {
      return;
    }

    this.setState({ show_nav: false });
  }

  getCurrentDisplayElement() {
    var isquirks = document.compatMode !== 'BackCompat';
    var page = isquirks ? document.documentElement : document.body;
    var y = page.scrollTop;
    var h = 'innerHeight' in window ? window.innerHeight : page.clientHeight;
    for (let i = 0; i < this.blocks.length; i++) {
      const v = this.blocks[i].current;
      if (!v) {
        continue;
      }

      const e_y = this.getElementY(v)
      if (e_y >= y && e_y <= y + h) {
        return i;
      }
    }

    return null;
  }

  getElementY(element: any) {
    let y = 0;
    while (element.offsetParent !== null) {
      y += element.offsetTop;
      element = element.offsetParent;
    }
    return y;
  }

  render() {
    let { show_nav, hide_menu } = this.state;
    hide_menu = hide_menu || (!this.smallScreen);

    return (
      <div>
        <div className="head-bar" style={{ marginTop: hide_menu ? -60 : 0, }}>
          <div
            style={{ width: 48, height: 48, padding: 12, display: 'relative', float: 'left' }}
            onClick={() => {
              this.setState({ show_nav: !show_nav })
            }}
          >
            <img alt="" src={more_icn} width={24} height={24} />
          </div>
          <div style={{ float: 'left', color: 'white', textAlign: 'center', fontSize: 18, padding: '12px 0' }}>Zixuan Chen</div>
        </div>
        <Navigator items={items} ref={this.nav} hide={!show_nav} />
        <Row>
          <Col xl={6} lg={8} md={8} sm={12} xs={12}>
          </Col>
          <Col xl={18} lg={16} md={16} sm={24} xs={24} style={{ minWidth: '280px', paddingTop: 40 }} onClick={this.onSmallScreenOutsideNavClick}>
            <div className="home-block fullpage" id="about" ref={this.blocks[0]}>
              <h1 className="block-title">About</h1>
              <h1 style={{ color: '#d88' }}>Hi, I'm Zixuan Chen</h1>
              <br />
              <div style={{ padding: 10 }}>
                <p>
                  I'm a research assistant in Computer School of Fudan University under the supervision
                  of Prof. <a href="https://www.linkedin.com/in/mingmin-chi-84a81515/?originalSubdomain=cn">Mingmin Chi</a>.
                  I'm currently working on face recognition. I obtained B.Eng. degree at Wuhan University (China).
                </p>
                <p>
                  I was an intern in Big Data Mining Group in Microsoft Research Asia, supervised by Dr. <a href="https://www.microsoft.com/en-us/research/people/borjekar/">Borje Karlsson</a>, working on <a href="https://luis.ai/">language understanding service</a>. My research interests include computer vision, explainable AI and visualization.
                </p>
              </div>
            </div>

            <div className="home-block" id="education" ref={this.blocks[1]}>
              <h1 className="block-title">Education</h1>
              <div style={{ marginTop: 40 }}>
                <Block image={whu_icon}>
                  <i>Sep. 2014 - Jul. 2018</i>
                  <h3 style={{ margin: 0 }}>School of Computer Science, Wuhan University</h3>
                  <p style={{ margin: 0 }}>Bachelor of Science</p>
                  <p style={{ margin: 0 }}><b style={{ color: 'black' }}>GPA: 3.67/4.0</b></p>
                </Block>
              </div>
            </div>

            <div className="home-block" id="work-experience" ref={this.blocks[2]}>
              <h1 className="block-title">Experience</h1>
              <Block image={fudan_icon}>
                <i>Sep. 2018 - Present</i>
                <h3 style={{ margin: 0 }}>School of Computer Science, Fudan University</h3>
                <p style={{ fontSize: 16 }}>Research Assistant</p>
                <p style={{ margin: 0, fontSize: 14}}> Doing research about partial face recognition problem and developping face recognition project and fabric flaw detection project.</p>
              </Block>
  
              <Block image={ms_icon}>
                <i>Sep. 2017 - Apr. 2018</i>
                <h3 style={{ margin: 0 }}>Big Data Mining Group, Microsoft Research Asia</h3>
                <p style={{ fontSize: 16 }}>Research Intern</p>
                <p style={{ margin: 0, fontSize: 14}}> Being Responsible for benchmarking <a href="https://luis.ai">LUIS</a> against its competitors to estimate and improve the system’s performance, writing tests and code for the pattern engine and the position recognizer of LUIS.</p>
              </Block>
            </div>

            <div className="home-block" id="projects" ref={this.blocks[3]}>
              <h1 className="block-title">Projects</h1>
              <ProjectBlock image={poicare}>
                <i>Dec. 2016 - Sep. 2017</i>
                <h3 style={{margin: 0}}>[Undergraduate Thesis]</h3>
                <h3 > Semantic Similarity Measurement by Jointly Embedding of Knowledge Graph and Words </h3>
                <p style={{ margin: 0 }}>
                  This research project proposes a method to enhance the semantic similarity judgment on graphs through joint embdding text information. There are rich hierarchical information among the concept nodes of knowledge graph. This project embeds the graph nodes and words jointly into the Poincaré space that can express hierarchical information better.
                </p>
              </ProjectBlock>
              <ProjectBlock image={helmet}>
                <i>Dec. 2016 - Sep. 2017</i>
                <h3>Intelligent Helmet</h3>
                <p style={{ margin: 0 }}>
                  An IoT device based on the helmet to help worker and the management on the constructionsite.  Won the first prize in 2017 TIIC National Undergraduate IOT Design Contest.  The mainfunctions of this project cover tumble detection (designed by us), voice command, indoorlocalization, live streaming and web visualization.
                  </p>
              </ProjectBlock>
              <ProjectBlock image={xiaom}>
                <i>Jun. 2017 - Aug. 2017</i>
                <h3>Intelligent Chatbot for Wuhan University</h3>
                <p style={{ margin: 0 }}>
                  A chatbot that serves students and tourists in the compus, based on NLP and ML.  Won the Second Prize (3/1100) in 2017 Beautyof Programming
                </p>
              </ProjectBlock>
            </div>

            <div className="home-block" id="honors" ref={this.blocks[4]}>
              <h1 className="block-title">Hornors</h1>
              <ul>
                <li>Award of Excellence, Stars of Tomorrow Internship Program, Microsoft Research Asia, 2018</li>
                <li>First Prize (30/1500) & Google Innovation Award (10/1500) in Final Context, 2017 TI CupNational College Students’ Internet of Things Design Contest, 2017</li>
                <li>Second Prize (3/1100) of the Beauty of Programming 2017 (Microsoft Research Asia & IEEE), 2017</li>
                <li>Wining Prize (10/104) of ”Citi Cup” Financial Innovation Application Competition, 2016</li>
                <li>Third Prize of the Chinese Mathematics Competition, 2016</li>
                <li>First & Third & Second class scholarship (Top 5% & 30% & 15%), Wuhan University, 2014-2017</li>
              </ul>
            </div>

            <div className="home-block fullpage" id="personal" ref={this.blocks[5]}>
              <h1 className="block-title">Personal</h1>
              <div style={{padding: 10}}>
                <p>
                  I have a great passion for visual appealing things. I draw or design things from time to time with pen or with code.
                </p>
                <p>
                  I enjoy reading as much as I love movies. Below are my favorite.
                </p>
              </div>
            </div>
          </Col>
          {/* <a href="https://clustrmaps.com/site/1apmd"  title="Visit tracker"><img src="//www.clustrmaps.com/map_v2.png?d=AZ4c_Lxa337iKmeP5gBMAAHZfVZgMmrAg59U8ourLRg&cl=ffffff" /></a> */}
        </Row>
      </div>
    );
  }
}

export default DevHome;
