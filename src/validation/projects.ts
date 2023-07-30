import { checkNotCntrChar } from '../utils/validation'

export type FormData = {
  projectName: string,
  startDate: string | null,
  endDate: string | null,
}

const rules = {
  projectName: {
    required: 'プロジェクト名を入力してください。',
    maxLength: {
      value: 255,
      message: 'プロジェクト名は255文字以下で入力してください。'
    },
    validate: {
      notCntrChar: (value: string) => {
        return checkNotCntrChar(value) ? true : 'プロジェクト名は制御文字以外で入力してください。'
      },
    }
  },
  startDate: {
    required: '開始日を入力してください。',
    validate: {
      beforeTheEndDate: (value: FormData['startDate'], { endDate }: FormData) => {
        if (value && endDate) {
          if (endDate <= value) {
            return '開始日は終了日より古い日付を入力してください。'
          }
        }
        return true
      },
    }
  },
  endDate: {
    required: '終了日を入力してください。',
    validate: {
      LaterThanStartDate: (value: FormData['endDate'], { startDate }: FormData) => {
        if (value && startDate) {
          if (startDate >= value) {
            return '終了日は開始日より新しい日付を入力してください。'
          }
        }
        return true
      }
    }
  }
}

export default rules