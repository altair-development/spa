import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm, Controller, FieldErrors, FieldError } from "react-hook-form"
import { Projects } from 'RequestDataTypes'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { SYSTEM, LoadingState } from '../../../const'
import { create, selectLoading } from '../../../redux/projects/slice'
import rules, { FormData } from '../../../validation/projects'
import Dialog, { DialogTitle, DialogContent, DialogActions } from '../../atoms/Dialog'
import TextField from '../../atoms/TextField'
import Txt, { ErrorTxt } from '../../atoms/Txt'
import UpdateBtnArea, { Props as UpdateBtnAreaProps } from '../../molecules/UpdateBtnArea'
import WatcherSearchArea, { Result as WatcherResult, MatchData as WatcherMatchData } from './WatcherSearchArea'
import WatcherResultArea from './WatcherResultArea'
import CustomDatePicker from '../../molecules/CustomDatePicker'
import styles from './styles.module.scss'
import classNames from 'classnames'

type Props = {
  onClickOutside: () => void,
  overlayProps?: React.HTMLAttributes<HTMLDivElement>,
  cardProps?: React.HTMLAttributes<HTMLDivElement>,
  onSuccess?: () => void,
  onCancel: UpdateBtnAreaProps['onCancel'],
  clanId: string,
  [key: string]: any
}

const CreateProjectDlg = React.memo(({
  onClickOutside: onClickOutsideParam,
  overlayProps,
  cardProps,
  onSuccess,
  onCancel,
  clanId,
  ...props
}: Props) => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    control,
    formState: {
      errors,
      touchedFields,
      dirtyFields,
      isSubmitted
    },
    trigger,
    watch,
    setValue
  } = useForm<FormData>({ mode: 'onBlur' })
  const [watcherResultList, setWatcherResultList] = useState<WatcherResult[]>([])
  const load = useAppSelector(selectLoading)
  const isLoading = useMemo(() => {
    return load === LoadingState.LOADING
  }, [load])
  const startDateRef = useRef<HTMLInputElement | null>(null)

  const setStartDateRef = useCallback((node: HTMLInputElement | null) => {
    startDateRef.current = node
    if (startDateRef.current) {
      startDateRef.current.tabIndex = 3
    }
  }, [])

  const onStartDateChange = useCallback((onChange: (...event: any[]) => void) => (value: string | null) => {
    onChange(value)
    trigger('startDate')
    trigger('endDate')
  }, [trigger])

  const endDateRef = useRef<HTMLInputElement | null>(null)

  const setEndDateRef = useCallback((node: HTMLInputElement | null) => {
    endDateRef.current = node
    if (endDateRef.current) {
      endDateRef.current.tabIndex = 5
    }
  }, [])

  const onEndDateChange = useCallback((onChange: (...event: any[]) => void) => (value: string | null) => {
    onChange(value)
    trigger('endDate')
    trigger('startDate')
  }, [trigger])

  const onSubmit = handleSubmit(async data => {
    const watchers: Projects['create']['watchers'] = []
    watcherResultList.forEach(watcher => {
      watchers.push({
        user_id: watcher.id
      })
    })

    const params: Projects['create'] = {
      clan_id: clanId,
      name: data.projectName,
      start_date: data.startDate as string,
      end_date: data.endDate as string,
      watchers: watchers
    }
    
    await dispatch(create(params))
    onSuccess && onSuccess()
  })
  
  const onWatcherClick = useCallback((watcher: WatcherMatchData) => {
    const tmp = [
      ...watcherResultList,
      watcher
    ]
    setWatcherResultList(tmp)
  }, [watcherResultList])

  const onWatcherDelete = useCallback((userId: string) => {
    const tmp = watcherResultList.filter(({ id }) => userId !== id)
    setWatcherResultList(tmp)
  }, [watcherResultList])

  const isInvalidStartDate = useCallback((startDate: FieldErrors<FormData>['startDate']): startDate is FieldError => {
    return (touchedFields.startDate || isSubmitted) && Boolean(startDate)
  }, [touchedFields.startDate, isSubmitted])

  const isInvalidEndDate = useCallback((endDate: FieldErrors<FormData>['endDate']): endDate is FieldError => {
    return (touchedFields.endDate || isSubmitted) && Boolean(endDate)
  }, [touchedFields.endDate, isSubmitted])

  const registeredProjectName = register('projectName', rules.projectName)
  const onChangeProjectName = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    registeredProjectName.onChange(e)
    trigger('projectName')
  }, [trigger, registeredProjectName])

  const startDatePopperRef = useRef<HTMLDivElement | null>(null)
  const endDatePopperRef = useRef<HTMLDivElement | null>(null)
  const watcherListRef = useRef<HTMLDivElement | null>(null)

  const onClickOutside = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (startDatePopperRef.current) {
      if (!startDatePopperRef.current.contains(e.target as Node)) {
        onClickOutsideParam()
      }
    } else if (endDatePopperRef.current) {
      if (!endDatePopperRef.current.contains(e.target as Node)) {
        onClickOutsideParam()
      }
    } else if (watcherListRef.current) {
      if (!watcherListRef.current.contains(e.target as Node)) {
        onClickOutsideParam()
      }
    } else {
      onClickOutsideParam()
    }
  }, [onClickOutsideParam])

  const onCloseStartDate = useCallback(() => {
    startDatePopperRef.current = null
  }, [])

  const onCloseEndDate = useCallback(() => {
    endDatePopperRef.current = null
  }, [])
  
  return (
    <Dialog
      onClickOutside={onClickOutside}
      overlayProps={{
        id: styles['create-project-dlg'],
        ...overlayProps
      }}
      cardProps={{
        style: {
          width: 590,
          boxSizing: 'border-box'
        },
        ...cardProps
      }}
      {...props}
    >
      <DialogTitle>
        <Txt
          tag='h1'
          size='l'
          className={styles['dialog-title']}
        >
          プロジェクトを作成する
        </Txt>
      </DialogTitle>
      <DialogContent>
        <table>
          <tbody>
            <tr>
              <th colSpan={2}>
                <label htmlFor='name'>プロジェクト名</label>
              </th>
            </tr>
            <tr>
              <td colSpan={2}>
                <TextField
                  tabIndex={1}
                  type="text"
                  {...registeredProjectName}
                  onChange={onChangeProjectName}
                  className={classNames({ 'text-field-errored': errors?.projectName})}
                />
              </td>
            </tr>
            {
              errors.projectName ?
                (
                  <tr className={styles['error-row']}>
                    <td colSpan={2}>
                      <ErrorTxt size='s'>{errors.projectName.message}</ErrorTxt>
                    </td>
                  </tr>
                ): null
            }
            <tr>
              <th>
                <label htmlFor='start-date'>開始日</label>
              </th>
              <th>
                <label htmlFor='end-date'>終了日</label>
              </th>
            </tr>
            <tr>
              <td className={styles['start-date-td']}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={rules.startDate}
                  render={({ field: { onChange, value, onBlur } }) => {
                    
                    return (
                      <CustomDatePicker
                        className={classNames({'datepicker-errored': isInvalidStartDate(errors.startDate)})}
                        value={value}
                        onChange={onStartDateChange(onChange)}
                        inputRef={setStartDateRef}
                        slotProps={{
                          openPickerButton: {
                            tabIndex: 4,
                          },
                          textField: {
                            onBlur: onBlur,
                            error: false
                          },
                          popper: {
                            ref: startDatePopperRef
                          }
                        }}
                        onClose={onCloseStartDate}
                      />
                    )
                  }}
                />
              </td>
              <td>
                <Controller
                  name="endDate"
                  control={control}
                  rules={rules.endDate}
                  render={({ field: { onChange, value, onBlur } }) => {
                    
                    return (
                      <CustomDatePicker
                        className={classNames({'datepicker-errored': isInvalidEndDate(errors.endDate)})}
                        value={value}
                        onChange={onEndDateChange(onChange)}
                        inputRef={setEndDateRef}
                        slotProps={{
                          openPickerButton: {
                            tabIndex: 6
                          },
                          textField: {
                            onBlur: onBlur,
                            error: false
                          },
                          popper: {
                            ref: endDatePopperRef
                          }
                        }}
                        onClose={onCloseEndDate}
                      />
                    )
                  }}
                />
              </td>
            </tr>
            {
              isInvalidStartDate(errors.startDate) || isInvalidEndDate(errors.endDate) ?
                (
                  <tr className={styles['error-row']}>
                    <td>
                      {
                        isInvalidStartDate(errors.startDate) ? <ErrorTxt size='s'>{errors.startDate.message}</ErrorTxt> : null
                      }
                    </td>
                    <td>
                      {
                        isInvalidEndDate(errors.endDate) ? <ErrorTxt size='s'>{errors.endDate.message}</ErrorTxt> : null
                      }
                    </td>
                  </tr>
                ): null
            }
            <tr>
              <th colSpan={2}>
                <label htmlFor='name'>ウォッチャー</label>
              </th>
            </tr>
            <tr>
              <td colSpan={2}>
                <WatcherSearchArea
                  resultList={watcherResultList}
                  onSelect={onWatcherClick}
                  textFieldProps={{
                    tabIndex: 7
                  }}
                  clanId={clanId}
                  listAreaProps={{
                    ref: watcherListRef
                  }}
                />
              </td>
            </tr>
            {
              watcherResultList.length > 0 ? 
                (
                  <tr>
                    <td
                      colSpan={2}
                      className="watcher-result-list"
                    >
                      <WatcherResultArea
                        resultList={watcherResultList}
                        onDelete={onWatcherDelete}
                        tabIdxStart={8}
                      />
                    </td>
                  </tr>
                )
                :
                null
            }
            
          </tbody>
        </table>
      </DialogContent>
      <DialogActions>
        <UpdateBtnArea
          load={isLoading}
          success={false}
          fail={false}
          onSubmit={onSubmit}
          onCancel={onCancel}
          successStr='作成'
        />
      </DialogActions>
    </Dialog>
  )
})

CreateProjectDlg.displayName = 'CreateProjectDlg'
export default CreateProjectDlg