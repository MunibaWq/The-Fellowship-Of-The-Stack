import * as V from "victory";
import Theme from "./Theme";

const VPie = ({ data }) => {
    return (
        <V.VictoryPie
            padding={{ top: 0, left: 100, right: 100 }}
            padAngle={2}
            innerRadius={50}
            labels={({ datum }) => `${datum.x}: ${datum.y}%`}
            colorScale={[
                Theme.purple,
                Theme.purple + 75,
                Theme.purple + 50,
                Theme.purple + 30,
                Theme.purple + 10,
            ]}
            data={data}
        />
    );
};

export default VPie;
