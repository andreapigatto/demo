import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

import { dataAt, Wrapper, Menu, menuWidth, sliderWidth } from './Comp'

import { Data, YearData, Values } from '../../types'

import classes from './Chart.module.scss'

type ComponentProps = {
  data: Data
  year: number
  width: number
  height: number
  speedAnimation: number
  tableauFields?: Record<string, string> | null
  fieldsSelected: Record<string, string>
  setFieldsSelected: (field: string, value: string) => void
}

const margin = { top: 20, right: 20, bottom: 50, left: 70 }
const maxZoomLevel = 3
const minZoomLevel = 1

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const D3Chart = ({
  data,
  year,
  width,
  height,
  speedAnimation,
  tableauFields,
  fieldsSelected,
  setFieldsSelected,
}: ComponentProps) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const svgWidth = width - menuWidth
  const svgHeight = height - sliderWidth

  const xAxisData =
    Object.keys(fieldsSelected).length > 0
      ? ([] as number[]).concat(
          ...data.map((d) =>
            (d[fieldsSelected.xAxis] as Values)
              .map((item) => item[1])
              .filter((item) => item)
          )
        )
      : []
  const yAxisData =
    Object.keys(fieldsSelected).length > 0
      ? ([] as number[]).concat(
          ...data.map((d) =>
            (d[fieldsSelected.yAxis] as Values)
              .map((item) => item[1])
              .filter((item) => item)
          )
        )
      : []

  const x = d3.scaleLog(
    [Math.min(...xAxisData), Math.max(...xAxisData)],
    [margin.left, svgWidth - margin.right]
  )
  const y = d3.scaleLinear(
    [Math.min(...yAxisData), Math.max(...yAxisData)],
    [svgHeight - margin.bottom, margin.top]
  )
  const xAxis = d3.axisBottom(x).ticks(svgWidth / 80, ',')
  const yAxis = d3.axisLeft(y)
  const radius = d3.scaleSqrt([0, 5e8], [0, svgWidth / 24])
  const color = d3
    .scaleOrdinal(
      data.map((d) => d[fieldsSelected.color]),
      d3.schemeCategory10
    )
    .unknown('black')
  const legendData = Array.from(
    new Set(data.map((d) => d[fieldsSelected.color]))
  ) as string[]

  const initChart = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current)

      const zoomListener = d3
        .zoom()
        .scaleExtent([minZoomLevel, maxZoomLevel])
        .on('zoom', (event) => {
          svg.select('g.points').attr('transform', event.transform)
          svg.select('g.grid').attr('transform', event.transform)
          svg
            .select('g.xAxis')
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .call(xAxis.scale(event.transform.rescaleX(x)))
            .call((d) => d.select('.domain').remove())
          svg
            .select('g.yAxis')
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .call(yAxis.scale(event.transform.rescaleY(y)))
            .call((d) => d.select('.domain').remove())
          // setZoomLevel(d3.event.transform.k)
        })

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      svg.call(zoomListener)

      svg.append('g').attr('class', 'xAxis')
      svg.append('g').attr('class', 'yAxis')
      svg.append('g').attr('class', 'grid')
      svg.append('g').attr('class', 'points')

      const tooltip = d3.select(tooltipRef.current)
      tooltip.style('opacity', 0)
    }
  }

  const drawGrid = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current)

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
              .attr('y2', svgHeight - margin.bottom)
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
              .attr('x2', svgWidth - margin.right)
          )
      svg
        .select<SVGGElement>('g.xAxis')
        .attr('transform', `translate(0,${svgHeight - margin.bottom})`)
        .attr('cursor', 'default')
        .call(xAxis)
        .call((d) => d.select('.domain').remove())
        .call((g) =>
          g
            .append('text')
            .attr('x', width)
            .attr('y', -10)
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'end')
            .text('Income per capita (dollars) →')
            .attr('cursor', 'default')
        )
      svg
        .select<SVGGElement>('g.yAxis')
        .call(yAxis)
        .attr('transform', `translate(${margin.left},0)`)
        .attr('cursor', 'default')
        .call(yAxis)
        .call((d) => d.select('.domain').remove())
        .call((g) =>
          g
            .append('text')
            .attr('x', -margin.left)
            .attr('y', 10)
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'start')
            .text('↑ Life expectancy (years)')
            .attr('cursor', 'default')
        )
      svg.select<SVGGElement>('g.grid').call(grid)
    }
  }

  const drawChart = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current)
      const tooltip = d3.select(tooltipRef.current)

      const yearData = dataAt(year, data)

      svg
        .select<SVGGElement>('g.points')
        .selectAll<SVGCircleElement, YearData>('circle.point')
        .data(yearData, (d) => d[fieldsSelected.dimension])
        .join(
          (enter) => enter.append('circle'),
          (update) =>
            update.call((d) =>
              d
                .transition()
                .duration(speedAnimation)
                .ease(d3.easeLinear)
                .attr('cx', (d1) => x(+d1[fieldsSelected.xAxis]))
                .attr('cy', (d1) => y(+d1[fieldsSelected.yAxis]))
            ),
          (exit) => exit
        )
        .attr('class', 'point')
        .attr('stroke', 'black')
        .attr('stroke-width', '0.8px')
        .sort((a, b) => d3.descending(a.population, b.population))
        .attr('r', (d) => radius(+d[fieldsSelected.size]))
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .attr('fill', (d) => color(d[fieldsSelected.color]))
        .on('mouseover', (event, d) => {
          svg
            .select<SVGGElement>('g.points')
            .selectAll<SVGCircleElement, YearData>('circle.point')
            .filter(
              (d1) =>
                d1[fieldsSelected.dimension] !== d[fieldsSelected.dimension]
            )
            .attr('opacity', 0.2)

          tooltip.transition().duration(100).style('opacity', 0.9)
          tooltip
            .html(
              `<p><strong>${fieldsSelected.dimension}: </strong>${
                d[fieldsSelected.dimension]
              }</p><p><strong>${fieldsSelected.size}: </strong>${
                d[fieldsSelected.size]
              }</p>`
            )
            .style('left', `${event.offsetX}px`)
            .style('top', `${event.offsetY}px`)
        })
        .on('mouseout', (event, d) => {
          svg
            .select<SVGGElement>('g.points')
            .selectAll<SVGCircleElement, YearData>('circle.point')
            .attr('opacity', 1)
          tooltip.transition().duration(100).style('opacity', 0)
        })
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
  }, [data, fieldsSelected, width, height])

  return (
    <Wrapper
      year={year}
      tableauFields={tableauFields}
      fieldsSelected={fieldsSelected}
      setFieldsSelected={setFieldsSelected}
    >
      <div className={classes.MainChart}>
        <div className={classes.Tooltip} ref={tooltipRef} />
        <svg
          viewBox={`0,0, ${svgWidth}, ${svgHeight}`}
          width={svgWidth}
          height={svgHeight}
          ref={svgRef}
        />
        <Menu
          tableauFields={tableauFields}
          fieldsSelected={fieldsSelected}
          setFieldsSelected={setFieldsSelected}
          legendColor={color}
          legendData={legendData}
        />
      </div>
    </Wrapper>
  )
}

export default D3Chart
