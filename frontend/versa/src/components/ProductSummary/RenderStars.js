import { Star } from "../../images/icons";

const RenderStars = ({ num_stars }) => {
    let starArray = [];
    for (let num = num_stars; num !== 0; num--) {
        starArray.push(<Star key={num} />);
    }
    return starArray;
};

export default RenderStars;
