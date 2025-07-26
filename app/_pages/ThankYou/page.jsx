"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, User } from "lucide-react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ThankYou() {
    const router = useRouter()
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push("/login")
        }, 3000)

        return () => {
            clearTimeout(timeout)
        }
    }, [router])

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader className="pb-4">
                    <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Thank you for joining us</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full text-sm font-medium">
                            <CheckCircle className="w-4 h-4" />
                            Password Set Successfully
                        </div>
                        <p className="text-gray-600 text-sm">
                            Your account has been created and your password has been set perfectly. You are all ready to get started!
                        </p>
                    </div>

                    <div className="space-y-3 hidden">
                        <Button className="w-full" size="lg">
                            <User className="w-4 h-4 mr-2" />
                            Go to Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
