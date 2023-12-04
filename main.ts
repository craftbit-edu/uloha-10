function rozhledniSe (směr: string) {
    if (směr == "P") {
        wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, 180)
        basic.pause(100)
        vzdalenost = grove.measureInCentimetersV2(DigitalPin.P2)
    } else if (směr == "L") {
        wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, 0)
        basic.pause(100)
        vzdalenost = grove.measureInCentimetersV2(DigitalPin.P2)
    } else {
        wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, 90)
    }
}
function jedDopredu (korekce: number) {
    if (korekce >= min && korekce <= max) {
        wuKong.mecanumRun(wuKong.RunList.Front, 250)
    } else if (korekce < min) {
        wuKong.mecanumRun(wuKong.RunList.LeftFront, 250)
    } else if (korekce < min) {
    	
    } else {
        wuKong.mecanumRun(wuKong.RunList.RightFront, 250)
    }
}
function Nastavení () {
    wuKong.mecanumWheel(
    wuKong.ServoList.S5,
    wuKong.ServoList.S1,
    wuKong.ServoList.S7,
    wuKong.ServoList.S3
    )
    rychlost = 250
}
let korekceSmeru = 0
let rychlost = 0
let vzdalenost = 0
let max = 0
let min = 0
let optimální = 10
min = optimální - 2
max = optimální + 2
Nastavení()
basic.forever(function () {
    rozhledniSe("L")
    korekceSmeru = optimální - grove.measureInCentimetersV2(DigitalPin.P2)
    jedDopredu(korekceSmeru + optimální)
    basic.pause(500)
})
