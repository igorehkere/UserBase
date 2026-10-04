import { getCloudinaryUploadUrl, type CloudinaryUploadPresetName, type CloudinaryUploadTypeName } from "@authwithback/shared/src/cloudinary";
import type { FormikProps } from "formik";
import { useRef, useState } from "react";
import { useUploadToCloudinary } from "../UploadToCloudinary";
import css from './index.module.scss'
import cn from "classnames";
import { Icon } from "../Icon";
import { ButtonUploadImage } from "../ButtonUploadImage";


export const UploadsToCloudinary = <TTypeName extends CloudinaryUploadTypeName>({
    label,
    name,
    formik,
    type,
    preset
}: {
    label: string,
    name: string,
    formik: FormikProps<any>,
    type: TTypeName,
    preset: CloudinaryUploadPresetName<TTypeName>
}) => {
    const value = formik.values[name] as string[]
    const disabled = formik.isSubmitting

    const inputEl = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)

    const {uploadToCloudinary} = useUploadToCloudinary(type)

    return (
		<div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
	      <input
	        className={css.fileInput}
	        type="file"
	        disabled={loading || disabled}
	        accept="image/*"
	        multiple
	        ref={inputEl}
	        onChange={({ target: { files } }) => {
	          void (async () => {
	            setLoading(true)
	            try {
	              if (files?.length) {
	                const newValue = [...value]
	                await Promise.all(
	                  Array.from(files).map(async (file) => {
	                    await uploadToCloudinary(file).then(({ publicId }) => {
	                      newValue.push(publicId)
	                    })
	                  })
	                )
	                void formik.setFieldValue(name, newValue)
	              }
	            } catch (err: any) {
	              console.error(err)
	              formik.setFieldError(name, err.message)
	            } finally {
	              void formik.setFieldTouched(name, true, false)
	              setLoading(false)
	              if (inputEl.current) {
	                inputEl.current.value = ''
	              }
	            }
	          })()
	        }}
	      />
	      <label className={css.label} htmlFor={name}>
	        {label}
	      </label>
	      {!!value?.length && (
	        <div className={css.previews}>
	          {value.map((publicId) => (
	            <div key={publicId} className={css.previewPlace}>
	              <button
	                type="button"
	                className={css.delete}
	                onClick={() => {
	                  void formik.setFieldValue(
	                    name,
	                    value.filter((deletedPublicId) => deletedPublicId !== publicId)
	                  )
	                }}
              >	
	                <Icon className={css.deleteIcon} name="deleteCross" />
	              </button>
	              <img className={css.preview} alt="" src={getCloudinaryUploadUrl(publicId, type, preset)} />
	            </div>
	          ))}
	        </div>
	      )}
	      <div className={css.buttons}>
	        <ButtonUploadImage
	          type="button"
	          onClick={() => inputEl.current?.click()}
	          loading={loading}
	          disabled={loading || disabled}
	          color="green"
        >	
	          {value?.length ? 'Загрузить еще' : '+'}
	        </ButtonUploadImage>
	      </div>
	    </div>
	)
}
