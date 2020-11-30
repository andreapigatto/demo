import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

import dataAt from './Comp/Settings'

import { Data, YearData } from '../../types'

type ComponentProps = {
  data: Data
  year: number
  width: number
  height: number
}

const margin = { top: 20, right: 20, bottom: 35, left: 40 }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const D3Chart = ({ data, year, width, height }: ComponentProps) => {
  const svgRef = useRef<SVGSVGElement>(null)

  const x = d3.scaleLog([200, 1e5], [margin.left, width - margin.right])
  const y = d3.scaleLinear([14, 86], [height - margin.bottom, margin.top])
  const radius = d3.scaleSqrt([0, 5e8], [0, width / 24])
  const color = d3
    .scaleOrdinal(
      data.map((d) => d.region),
      d3.schemeCategory10
    )
    .unknown('black')

  const initChart = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current)

      svg.append('g').attr('class', 'xAxis')
      svg.append('g').attr('class', 'yAxis')
      svg.append('g').attr('class', 'grid')
      svg.append('g').attr('class', 'points')
    }
  }

  const drawGrid = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current)
      const xAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
        g
          .attr('transform', `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x).ticks(width / 80, ','))
          .call((d) => d.select('.domain').remove())
          .call((d) =>
            d
              .append('text')
              .attr('x', width)
              .attr('y', margin.bottom - 4)
              .attr('fill', 'currentColor')
              .attr('text-anchor', 'end')
              .text('Income per capita (dollars) →')
          )

      const yAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
        g
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y))
          .call((d) => d.select('.domain').remove())
          .call((d) =>
            d
              .append('text')
              .attr('x', -margin.left)
              .attr('y', 10)
              .attr('fill', 'currentColor')
              .attr('text-anchor', 'start')
              .text('↑ Life expectancy (years)')
          )

      const grid = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
        g
          .attr('stroke', 'currentColor')
          .attr('stroke-opacity', 0.1)
          .call((g1) =>
            g1
              .selectAll('line.vertLine')
              .data(x.ticks())
              .join('line')
              .attr('class', 'vertLine')
              .attr('x1', (d) => 0.5 + x(d))
              .attr('x2', (d) => 0.5 + x(d))
              .attr('y1', margin.top)
              .attr('y2', height - margin.bottom)
          )
          .call((g1) =>
            g1
              .selectAll('line.horizLine')
              .data(y.ticks())
              .join('line')
              .attr('class', 'horizLine')
              .attr('y1', (d) => 0.5 + y(d))
              .attr('y2', (d) => 0.5 + y(d))
              .attr('x1', margin.left)
              .attr('x2', width - margin.right)
          )
      svg.select<SVGGElement>('g.xAxis').call(xAxis)
      svg.select<SVGGElement>('g.yAxis').call(yAxis)
      svg.select<SVGGElement>('g.grid').call(grid)
    }
  }

  const drawChart = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current)

      svg
        .select<SVGGElement>('g.points')
        .selectAll<SVGCircleElement, YearData>('circle.point')
        .data(dataAt(year, data), (d) => d.name)
        .join('circle')
        .attr('class', 'point')
        .attr('stroke', 'black')
        .sort((a, b) => d3.descending(a.population, b.population))
        .attr('cx', (d) => x(d.income))
        .attr('cy', (d) => y(d.lifeExpectancy))
        .attr('r', (d) => radius(d.population))
        .attr('fill', (d) => color(d.region))
        .call((circle) =>
          circle.append('title').text((d) => [d.name, d.region].join('\n'))
        )
    }
  }

  const updateGrid = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current)
      svg.select('g.xAxis').remove()
      svg.select('g.yAxis').remove()
      svg.select('g.grid').remove()

      svg.append('g').attr('class', 'xAxis')
      svg.append('g').attr('class', 'yAxis')
      svg.append('g').attr('class', 'grid')

      drawGrid()
    }
  }

  useEffect(() => {
    initChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    drawChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year])

  useEffect(() => {
    updateGrid()
    drawChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, width, height])

  return <svg viewBox={`0,0, ${width}, ${height}`} ref={svgRef} />
}

export default D3Chart
