"use client"

import { useCallback, useMemo, useState } from "react"
import { useDropzone } from "react-dropzone"
import Papa from "papaparse"
import { Upload, File, CheckCircle, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

const CsvFileUpload = ({
    onUpload = () => { },
    ...dropzoneProps
}) => {
    const [uploadedFile, setUploadedFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        setError(null)
        setSuccess(false)

        if (rejectedFiles.length > 0) {
            setError("Please upload a valid CSV file")
            return
        }

        if (acceptedFiles.length === 1) {
            const file = acceptedFiles[0]
            setUploadedFile(file)
            setIsProcessing(true)

            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    setIsProcessing(false)
                    setSuccess(true)
                    // call the api to make the request to the backend
                    onUpload(results.data)


                },
                error: (error) => {
                    console.error("CSV Parsing Error:", error.message)
                    setError(`CSV parsing failed: ${error.message}`)

                    setIsProcessing(false)
                },
            })
        }
    }, [onUpload])

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: {
            "text/csv": [".csv"],
            "application/vnd.ms-excel": [".csv"],
        },
        multiple: false,
        maxSize: 10 * 1024 * 1024, // 10MB limit
    })

    const removeFile = useCallback(() => {
        setUploadedFile(null)
        setError(null)
        setSuccess(false)
    }, [])

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }
    const dropzoneClasses = useMemo(() => {
        let classes =
            "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 "

        if (isDragActive && !isDragReject) {
            classes += "border-blue-500 bg-blue-50 text-blue-600"
        } else if (isDragReject) {
            classes += "border-red-500 bg-red-50 text-red-600"
        } else if (uploadedFile && success) {
            classes += "border-green-500 bg-gray-100 opacity-40 cursor-not-allowed"
        } else {
            classes += "border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600"
        }

        return classes
    }, [isDragActive, isDragReject, uploadedFile, success])

    return (
        <div className="space-y-4">
            <Card className="rounded-none shadow-none border-none">
                <CardContent className="p-1">
                    <div
                        {...getRootProps()}
                        className={dropzoneClasses}
                        style={uploadedFile && success ? { pointerEvents: "none" } : {}}
                        {...dropzoneProps}
                    >
                        <input {...getInputProps()} />

                        {isProcessing ? (
                            <div className="flex flex-col items-center space-y-2">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <p className="text-sm font-medium">Processing CSV...</p>
                            </div>
                        ) : isDragActive ? (
                            <div className="flex flex-col items-center space-y-2">
                                <Upload className="h-12 w-12" />
                                <p className="text-sm font-medium">
                                    {isDragReject ? "File type not supported" : "Drop the CSV file here"}
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center space-y-2">
                                <Upload className="h-12 w-12" />
                                <p className="text-sm font-medium">Drag & drop a CSV file here</p>
                                <p className="text-xs text-gray-500">or click to select a file</p>
                                <p className="text-xs text-gray-400">Max file size: 10MB</p>
                            </div>
                        )}
                    </div>

                    {uploadedFile && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <File className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                                        <p className="text-xs text-gray-500">{formatFileSize(uploadedFile.size)}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={removeFile} className="h-8 w-8 p-0">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert className="mt-4 border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                                CSV file has been successfully parsed and processed!
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default CsvFileUpload
