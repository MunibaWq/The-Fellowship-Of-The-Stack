import { Star } from "../../images/icons";

const RenderStars = ({ num_stars }) => {
    let starArray = [];
    if (num_stars) {
        //reset the condition from num<=0 back to num!==0 otherwise stars would not render
        for (let num = num_stars; num !== 0; num--) {
            starArray.push(<Star key={num} />);
        }
    }
    return starArray;
};

export default RenderStars;
