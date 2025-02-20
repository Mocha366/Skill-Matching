import React from "react";
import "./Explanation.css";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import Menu from "../../../components/Menu";

const Explanation: React.FC = () => {
    return (
        <div className="explanation-page">
            <HeaderBar/>
        <div className="explanation-Menu">
            <Menu/>
        </div>
            <div className="explanation-container">
                <h1>SkillMatchingのようなマッチングアプリを使う理由</h1>
                <p>
                    みなさんの想像するマッチングアプリはおそらく、異性との出会いやきっかけを作るものだと思います。
                    ですが我々が作った「SkillMatching」は、開発が仕事の技術者や趣味で開発をしている人、
                    これから職にしようとしている学生を繋げるための物です。新しい技術に興味のある人、
                    ハッカソンに参加したいけどメンバーを集めることが難しい人、フロントしか出来ないからバックの開発を頼める人、
                    自分の技術力を更に向上させたい人など、自分に合ったぴったりの相手を見つけられるアプリを求めています。
                    なにを求めているかハッキリしないこともありますが、「SkillMatching」は様々な出会いを可能にするための
                    数々の機能が備わっています。オンラインでの出会いが、より簡単になりました。
                </p>
                <p>
                    SkillMatchingが最高の無料アプリだと断言する前に、実際にSkillMatchingについて知ってもらいたい、
                    皆さん自身に判断してもらいたいと思っています。
                </p>
            </div>
        </div>
    );
};

export default Explanation;