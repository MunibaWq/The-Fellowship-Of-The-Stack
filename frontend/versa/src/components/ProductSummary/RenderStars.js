import { Star } from "../../images/icons";

const RenderStars = ({ num_stars }) => {
    console.log(num_stars);
    let starArray = [];
    for (let num = num_stars; num !== 0; num--) {
        starArray.push(<Star />);
    }
    return starArray;
};

export default RenderStars;
