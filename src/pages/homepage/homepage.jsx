import React, { Component } from 'react'
import 'antd/dist/antd.css';
import './homepage.css';
import { Carousel } from 'antd';
// import index1 from "../../../public/image/homepage/xk.jpg"
// import index2 from "%PUBLIC_URL%/image/homepage/as.jpg"
// import index3 from "%PUBLIC_URL%/image/homepage/xk.jpg"
// import index4 from "%PUBLIC_URL%/image/homepage/xy.jpg"

const imgStyle = {
    width: '100%',
    height: '640px',
    margin: 'auto',
    filter: 'blur(10px)',
    zIndex: '-100'
};

const imgStyle2 = {
    position: 'absolute',
    width: '1080px',
    height: '640px',
    margin: 'auto',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0'
};

const h1Style = {
    position: 'absolute',
    width: '880px',
    margin: 'auto',
    left: '0',
    right: '0',
    top: '20px',
    zIndex: '100',
    color: 'white',
    fontSize: '48px'
}

const shareImg = {
    width: '100%',
    height: '100%',
    margin: 'auto',
    zIndex: '-100'
}

const p1 = {
    fontSize: '40px'
}

const p2 = {
    fontSize: '20px',
    width: '600px'
}

export default class homepage extends Component {
    render() {
        return (
            <div className="homepage">
                <Carousel>
                    <div className="homepage-pic">
                        <p style={h1Style}>抗击疫情</p>
                        <img src={process.env.PUBLIC_URL + "/image/homepage/kangyi.jpg"} style={imgStyle} alt="抗疫.jpg"/>
                        <img src={process.env.PUBLIC_URL + "/image/homepage/kangyi.jpg"} style={ imgStyle2 } alt="抗疫.jpg"/>
                    </div>
                    <div className="homepage-pic">
                        <p style={h1Style}>做好防护</p>
                        <img src={process.env.PUBLIC_URL + "/image/homepage/fanghu.jpg"} style={imgStyle}  alt="防护.jpg"/>
                        <img src={process.env.PUBLIC_URL + "/image/homepage/fanghu.jpg"} style={ imgStyle2 } alt="防护.jpg"/>
                    </div>
                    <div className="homepage-pic">
                        <p style={h1Style}>团结一心</p>
                        <img src={process.env.PUBLIC_URL + "/image/homepage/tuanjie.jpeg"} style={imgStyle}   alt="团结.jpg"/>
                        <img src={process.env.PUBLIC_URL + "/image/homepage/tuanjie.jpg"} style={ imgStyle2 }  alt="团结.jpg"/>
                    </div>
                </Carousel>
                <div  className="homepage-covid">
                    <img src={process.env.PUBLIC_URL + "/image/homepage/xinguan.jpg"} style={shareImg}   alt="新冠.jpg"/>
                    <div>
                        <p style={p1}>新冠病毒</p>
                        <p style={p2}>2019新型冠状病毒，2020年1月12日，世界卫生组织正式将其命名为2019-nCoV。冠状病毒是一个大型病毒家族，已知可引起感冒以及中东呼吸综合征（MERS）和严重急性呼吸综合征（SARS）等较严重疾病。新型冠状病毒是以前从未在人体中发现的冠状病毒新毒株
人感染了冠状病毒后常见体征有呼吸道症状、发热、咳嗽、气促和呼吸困难等。在较严重病例中，感染可导致肺炎、严重急性呼吸综合征、肾衰竭，甚至死亡。对于新型冠状病毒所致疾病没有特异治疗方法。但许多症状是可以处理的，因此需根据患者临床情况进行治疗。此外，对感染者的辅助护理可能非常有效。做好自我保护包括：保持基本的手部和呼吸道卫生，坚持安全饮食习惯，并尽可能避免与任何表现出有呼吸道疾病症状（如咳嗽和打喷嚏等）的人密切接触</p>
                    </div>
                </div>
                <div  className="homepage-spread">
                    <img src={process.env.PUBLIC_URL + "/image/homepage/tuanjie.jpeg"} style={shareImg}   alt="病毒.jpg"/>
                    <div>
                        <p style={p1}>病毒传播</p>
                        <p style={p2}>新型冠状病毒主要的传播途径还是呼吸道飞沫传播和接触传播，气溶胶和粪—口等传播途径尚待进一步明确。通过流行病学调查显示，病例多可以追踪到与确诊的病例有过近距离密切接触的情况。 
                                        <br/>直接传播：是指患者喷嚏、咳嗽、说话的飞沫，呼出的气体近距离直接吸入导致的感染；
                                        <br />气溶胶传播：是指飞沫混合在空气中，形成气溶胶，吸入后导致感染；
                                        <br />接触传播：是指飞沫沉积在物品表面，接触污染手后，再接触口腔、鼻腔、眼睛等黏膜，导致感染。
                                        <br />母婴传播：新冠病毒检测呈阳性的母亲可能通过胎盘将病毒传染给了婴儿，且新冠病毒还可能在胎盘细胞中活跃复制</p>
                    </div>
                </div>
                <div  className="homepage-vaccines">
                    <img src={process.env.PUBLIC_URL + "/image/homepage/vaccine.jpg"} style={shareImg}   alt="疫苗.jpg"/>
                    <div>
                        <p style={p1}>新冠疫苗</p>
                        <p style={p2}>2020年8月5日，国药集团中国生物所属北京生物制品研究所新冠灭活疫苗生产车间通过国家相关部门组织的生物安全联合检查，具备使用条件。此前，该车间已取得新冠疫苗生产许可证；8月16日，陈薇院士团队新冠疫苗获得专利，系中国首个，该发明专利申请享有优先审查政策；8月20日，国药集团旗下中国生物新冠灭活疫苗的临床试验在秘鲁启动（Ⅲ期）；10月8日，中国同全球疫苗免疫联盟签署协议，正式加入“新冠肺炎疫苗实施计划”。截至2020年10月20日，中国共计接种了约6万名受试者，未收到严重不良反应的报告。
2020年12月31日，国务院联防联控机制发布，国药集团中国生物的新冠病毒灭活疫苗已获国家药监局批准附条件上市，保护效力达到世界卫生组织及国家药监局相关标准要求，未来将为全民免费提供。</p>
                    </div>
                </div>
                <div  className="homepage-protect">
                    <img src={process.env.PUBLIC_URL + "/image/homepage/protect.jpg"} style={shareImg}   alt="保护.jpg"/>
                    <div>
                        <p style={p1}>保护自己和他人</p>
                        <p style={p2}>一、加强个人防护
1.避免前往人群密集的公共场所。避免接触发热呼吸道感染病人，如需接触时要佩戴口罩。
2.勤洗手。尤其在手被呼吸道分泌物污染时、触摸过公共设施后、照顾发热呼吸道感染或呕吐腹泻病人后、探访医院后、处理被污染的物品以及接触动物、动物饲料或动物粪便后。
3.不要随地吐痰。打喷嚏或咳嗽时用纸巾或袖肘遮住口、鼻。
4.加强锻炼，规律作息，保持室内空气流通。
二、避免接触野生禽畜
1.避免接触禽畜、野生动物及其排泄物和分泌物，避免购买活禽和野生动物。
2.避免前往动物农场和屠宰场、活禽动物交易市场或摊位、野生动物栖息地或等场所。必须前往时要做好防护，尤其是职业暴露人群。
3.避免食用野生动物。不要食用已经患病的动物及其制品；要从正规渠道购买冰鲜禽肉，食用禽肉蛋奶时要充分煮熟，处理生鲜制品时，器具要生熟分开并及时清洗，避免交叉污染。
三、杜绝带病上班、聚会
如有发烧、咳嗽等呼吸道感染的症状，居家休息，减少外出和旅行，天气良好时居室多通风，接触他人请佩戴口罩。要避免带病上班、上课及聚会。
四、及时就医
从武汉等地外出旅行归来，如出现发热咳嗽等呼吸道感染症状，应根据病情就近选择医院发热门诊就医，并戴上口罩就诊，同时告知医生类似病人或动物接触史、旅行史等。</p>
                    </div>
                </div>
            </div>
        )
    }
}
