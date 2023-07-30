import React from 'react'
import classNames from 'classnames'
import { useAppSelector } from '../../../../redux/hooks'
import { selectProjectsByClanId } from '../../../../redux/projects/slice'
import { selectClanId, selectProjectId } from '../../../../redux/hashParams/slice'
import { getProjectUrl } from '../../../../utils'
import styles from '../styles.module.scss'

type ProjectListProps = {
  clanId: string
}
const ProjectList = React.memo(({ clanId }: ProjectListProps) => {
  const projects = useAppSelector((state) => {
    return selectProjectsByClanId(state, clanId)
  })
  const selectedClanId = useAppSelector(selectClanId)
  const selectedProjectId = useAppSelector(selectProjectId)
  return (
    <ul
      className={styles['project-list']}
    >
      {
        projects && Object.keys(projects).map((projectId) => {
          const project = projects[projectId].info
          return (
            <li
              key={projectId}
              className={
                classNames(
                  {
                    [styles.selected]: clanId === selectedClanId && projectId === selectedProjectId
                  }
                )
              }
            >
              <a
                href={getProjectUrl(clanId, projectId)}  
              >
                {project.name}
              </a>
            </li>
          )
        })
      }
    </ul>
  )
})
ProjectList.displayName = 'ProjectList'
export default ProjectList