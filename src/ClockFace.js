import React, { PureComponent, PropTypes } from 'react';
import { G, Circle, Text, Line } from 'react-native-svg';
import range from 'lodash.range';


export default class ClockFace extends PureComponent {

  static propTypes = {
    r: PropTypes.number,
    stroke: PropTypes.string,
    hourSteps: PropTypes.number,
    tickSteps: PropTypes.number,
    hourMultiplier: PropTypes.number
  }

  static defaultProps = {
    hourSteps: 12,
    tickSteps: 48,
    hourMultiplier: 1
  }

  render() {
    const { r, stroke, hourSteps, tickSteps, hourMultiplier } = this.props;
    const faceRadius = r - 5;
    const textRadius = r - 26;

    return (
      <G>
        {
          range(tickSteps).map(i => {
            const cos = Math.cos(2 * Math.PI / tickSteps * i);
            const sin = Math.sin(2 * Math.PI / tickSteps * i);

            return (
              <Line
                key={i}
                stroke={stroke}
                strokeWidth={i % 4 === 0 ? 3 : 1}
                x1={cos * faceRadius}
                y1={sin * faceRadius}
                x2={cos * (faceRadius - 7)}
                y2={sin * (faceRadius - 7)}
              />
            );
          })
        }
      <G transform={{translate: "0, -9"}}>
          {
            range(hourSteps).map((h, i) => (
              <Text
                key={i}
                fill={stroke}
                fontSize="16"
                textAnchor="middle"
                x={textRadius * Math.cos(2 * Math.PI / hourSteps * i - Math.PI / 2 + Math.PI / 6)}
                y={textRadius * Math.sin(2 * Math.PI / hourSteps * i - Math.PI / 2 + Math.PI / 6)}
              >
                {(h + 1) * hourMultiplier}
              </Text>
            ))
          }
        </G>
      </G>
    );
  }
}
