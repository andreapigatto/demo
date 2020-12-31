import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { menuWidth } from '../Settings'

import { Values } from '../../../../types'

type ComponentProps = {
  color: d3.ScaleOrdinal<string | Values, string, string>
  data: string[]
}

const Legend = ({ color, data }: ComponentProps): JSX.Element => {
  const svgLegendRef = useRef<SVGSVGElement>(null)

  const initChart = () => {
    if (svgLegendRef.current) {
      const svgLegend = d3.select(svgLegendRef.current)
      svgLegend.append('g').attr('class', 'legendNodes')
      svgLegend.append('g').attr('class', 'legendDescs')
    }
  }

  const drawLegend = () => {
    if (svgLegendRef.current) {
      const svgLegend = d3.select(svgLegendRef.current)

      svgLegend
        .select<SVGGElement>('g.legendNodes')
        .selectAll<SVGCircleElement, string[]>('circle.node')
        .data(data)
        .join('circle')
        .attr('class', 'node')
        .attr('cx', 30)
        .attr('cy', (d, i) => 50 + i * 25) // 100 is where the first dot appears. 25 is the distance between dots
        .attr('r', 7)
        .style('fill', (d) => color(d))

      svgLegend
        .select<SVGGElement>('g.legendDescs')
        .selectAll<SVGTextElement, string[]>('text.desc')
        .data(data)
        .join('text')
        .attr('class', 'desc')
        .attr('x', 40)
        .attr('y', (d, i) => 50 + i * 25) // 100 is where the first dot appears. 25 is the distance between dots
        .style('fill', (d) => color(d))
        .text((d) => d)
        .attr('text-anchor', 'left')
        .style('alignment-baseline', 'middle')
    }
  }

  useEffect(() => {
    initChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    drawLegend()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <svg
      viewBox={`0, 0, ${menuWidth}, 400`}
      width={menuWidth}
      ref={svgLegendRef}
    />
  )
}

export default Legend
