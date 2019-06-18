
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


const ali_siamese = "https://i.postimg.cc/3Rd2j45W/Ali-Based-Siamese-4d3767c1.png";
const dqn = "https://i.postimg.cc/ZK0X9jMh/DQN-ac6a23e8.png";
const fabric_labeling = "https://i.postimg.cc/hGM01RXZ/fabric-flaw-labeling-982c2277.png";
const face_recognition = "https://i.postimg.cc/xCMMFr8S/Face-Recognition-e8b2aa9f.png";
const items = [
  { href: 'about', title: 'About' },
  { href: 'education', title: 'Education' },
  { href: 'work-experience', title: 'Experience' },
  { href: 'projects', title: 'Projects' },
  { href: 'honors', title: 'Honors' },
  { href: 'skills', title: 'Skills' },
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
                  I'm a research assistant in the Computer School of Fudan University under the supervision
                  of Prof. <a href="http://homepage.fudan.edu.cn/mingmin/">Mingmin Chi</a>.
                  I'm currently working on face recognition. I obtained a B.Eng. Degree at Wuhan University (China).
                </p>
                <p>
                  I was an intern in Big Data Mining Group in Microsoft Research Asia, supervised by Dr. <a href="https://www.microsoft.com/en-us/research/people/borjekar/">Borje Karlsson</a>, working on <a href="https://luis.ai/">language understanding service</a>. My research interests include computer vision, explainable AI, and visualization.
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
              <ProjectBlock image={ali_siamese}>
                <i>Mar. 2019 - Now</i>
                <h3 >Semi-Supervised Siamese Generative Adversarial Network  </h3>
                <p style={{ margin: 0 }}>
                  Siamese networks are widely used in the scenario where the number of classes is vast, for example, face recognition. However, few works are integrating the Siamese structure into GAN and empowering it to learn from unlabeled data. This project aims to find a stable and straightforward solution to this end.
                </p>
              </ProjectBlock>
              <ProjectBlock image={fabric_labeling}>
                <i>Jan. 2019 - Jun. 2019</i>
                <h3 > Fabric Texture Flaws Detection/Segmentation Crowdsourcing Labeling System  </h3>
                <p style={{ margin: 0 }}>
                  Fabric texture flaw images are hard to collect. They are rare in production and can only be obtained by experienced workers in the scene. This system is built to boost the data collecting process. The system consists of Android front-end (taking pictures in product environment and labeling roughly), Web front-end (labeling and data management, built by React.js), node.js back-end.
                </p>
              </ProjectBlock>
              <ProjectBlock image={face_recognition}>
                <i>Sep. 2018 - Dec. 2018</i>
                <h3 >Face Recognition System </h3>
                <p style={{ margin: 0 }}>
                  This system consists of a Windows front-end module and Linux back-end module. The front-end handles the video stream and manage the blacklist and the whitelist, while the back-end serves to detect the human faces and extract the feature vectors.
                </p>
              </ProjectBlock>
              <ProjectBlock image={dqn}>
                <i>Dec. 2018 - Dec. 2018</i>
                <h3>Deep Q Learning</h3>
                <p style={{ margin: 0 }}>
                  Solve CartPole and Mountain Car problem by implementing Deep Q Learning with <a href="https://github.com/rem2016/priority_memory" target="_blanket">prioritized memory</a> and achieve competitive result on OpenAI Leaderboard.
                </p>
              </ProjectBlock>
              <ProjectBlock image={poicare}>
                <i>Dec. 2017 - May. 2018</i>
                <h3 style={{margin: 0}}>[Undergraduate Thesis]</h3>
                <h3 > Semantic Similarity Measurement by Jointly Embedding of Knowledge Graph and Words </h3>
                <p style={{ margin: 0 }}>
                  This research project proposes a method to enhance the semantic similarity judgment on graphs through joint embedding text information. There is rich hierarchical information among the concept nodes of knowledge graphs. This project embeds the graph nodes and words jointly into the Poincaré space that can express hierarchical details better.
                </p>
              </ProjectBlock>
              <ProjectBlock image={helmet}>
                <i>Dec. 2016 - Sep. 2017</i>
                <h3>Intelligent Helmet</h3>
                <p style={{ margin: 0 }}>
                  An IoT device based on the helmet to help worker and the management on the construction site.  Won the <b>first prize (10/1500)</b> in 2017 TIIC National Undergraduate IOT Design Contest.  The main functions of this project cover tumble detection (designed by us), voice command, indoor localization, live streaming, and web visualization.
                </p>
              </ProjectBlock>
              <ProjectBlock image={xiaom}>
                <i>Jun. 2017 - Aug. 2017</i>
                <h3>Intelligent Chatbot for Wuhan University</h3>
                <p style={{ margin: 0 }}>
                  A chatbot that serves students and tourists in the campus, based on NLP and ML.  Won the <b>second prize (3/1100)</b> in 2017 Beauty of Programming
                </p>
              </ProjectBlock>
            </div>

            <div className="home-block" id="honors" ref={this.blocks[4]}>
              <h1 className="block-title">Hornors</h1>
              <ul>
                <li>Award of Excellence, Stars of Tomorrow Internship Program, Microsoft Research Asia, 2018</li>
                <li>First Prize <b>(30/1500)</b> & Google Innovation Award <b>(10/1500)</b> in Final Context, 2017 TI CupNational College Students’ Internet of Things Design Contest, 2017</li>
                <li><b>Second Prize (3/1100)</b> of the Beauty of Programming 2017 (Microsoft Research Asia & IEEE), 2017</li>
                <li>Wining Prize (10/104) of ”Citi Cup” Financial Innovation Application Competition, 2016</li>
                <li>Third Prize of the Chinese Mathematics Competition, 2016</li>
                <li>First & Third & Second class scholarship (Top 5% & 30% & 15%), Wuhan University, 2014-2017</li>
              </ul>
            </div>

            <div className="home-block" id="skills" ref={this.blocks[5]}>
              <h1 className="block-title">Skills</h1>
              <h2 className="block-subtitle">Machine Learning Related</h2>
              <p>Sklearn, Pytorch, Pandas, Numpy, Keras</p>
              <h2 className="block-subtitle">Programing Languages & Tools</h2>
              <p>Python, JavaScript/TypeScript, C#, Java, C/C++, Git, React.js, D3.js, Vim</p>
            </div>

            <div className="home-block fullpage" id="personal" ref={this.blocks[6]}>
              <h1 className="block-title">Personal</h1>
              <div style={{padding: 10}}>
                <p>
                  I have a great passion for visual appealing things. I draw or design things from time to time with pen or with code.
                </p>
                <p>
                  I enjoy reading as much as I love movies. Below are my favorite.

                </p>
                <ul style={{ marginTop: 20 }}>
                  <li>Sapiens: A Brief History of Humankind</li>
                  <li>The Three-Body Problem</li>
                  <li>Principles by Ray Dalio</li>
                  <li>The Story of Your Life</li>
                  <li>The Gods Themselves</li>
                  <li>Dune</li>
                  <li>Game of Thrones</li>
                  <li>Westworld</li>
                </ul>
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
