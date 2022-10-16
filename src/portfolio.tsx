import React, { useMemo } from "react";

import {
    Cell, Group, MiniInfoCell, RichCell
} from "@vkontakte/vkui";
import {
    Icon20CalendarOutline,
    Icon20GlobeOutline,
    Icon20GovernmentOutline,
    Icon20HieroglyphCharacterOutline,
    Icon20MoneyCircleOutline,
    Icon20NotebookCheckOutline,
    Icon28CalendarOutline,
    Icon28MailOutline,
    Icon28PhoneOutline,
    Icon28PlaceOutline,
    Icon56UserCircleOutline,
} from "@vkontakte/icons";

import moment from "moment";
import utils from "@rus-anonym/web-utils";

interface IConfig {
    name: string;
    surname: string;
    birthday: string;
    specialty?: string;
    place?: string;
    phone?: string;
    email?: string;
    salary?: string;
    readyForBusinessTrips?: boolean;
    employment?: string;
    workSchedule?: string;
    citizenship?: string;
    languages?: string[];
}

class Config implements IConfig {
    public readonly name: string;
    public readonly surname: string;
    public readonly birthday: string;
    public readonly specialty?: string | undefined;
    public readonly place?: string | undefined;
    public readonly phone?: string | undefined;
    public readonly email?: string | undefined;
    public readonly salary?: string | undefined;
    public readonly readyForBusinessTrips?: boolean | undefined;
    public readonly employment?: string | undefined;
    public readonly workSchedule?: string | undefined;
    public readonly citizenship?: string | undefined;
    public readonly languages?: string[] | undefined;

    constructor(config: IConfig) {
        this.name = config.name;
        this.surname = config.surname;
        this.birthday = config.birthday;
        this.specialty = config.specialty;
        this.place = config.place;
        this.phone = config.phone;
        this.email = config.email;
        this.salary = config.salary;
        this.readyForBusinessTrips = config.readyForBusinessTrips;
        this.employment = config.employment;
        this.workSchedule = config.workSchedule;
        this.citizenship = config.citizenship;
        this.languages = config.languages;
    }

    public get fullName(): string {
        return `${this.name} ${this.surname}`;
    }

    public get age(): number {
        return moment().diff(
            moment(this.birthday, "DD.MM.YYYY"),
            "years",
            false
        );
    }

    public get isExtended(): boolean {
        const containedValues = Object.entries(this).filter(([, value]) => value !== undefined).map(([key]) => key);
        const mainFields = ["specialty", "place", "phone", "birthday", "name", "surname", "email"];

        const notMainFields = containedValues.filter((value) => !mainFields.includes(value));
        return notMainFields.length > 0;
    }
}

const Portfolio = (): JSX.Element => {
    const config = useMemo(() => {
        return new Config({
            name: "Иван",
            surname: "Иванов",
            birthday: "01.01.2000",
            specialty: "Специалист по информационным технологиям",
            place: "Москва",
            phone: "+7 (999) 999-99-99",
            citizenship: "Россия",
            email: "ivan.ivanov@example.com",
            employment: "Полная занятость",
            workSchedule: "Полный день",
            salary: "100 000 руб.",
            readyForBusinessTrips: false,
            languages: ["Русский", "Английский"],
        });
    }, []);

    return (
        <Group>
            <Group mode="plain" separator={config.isExtended ? "show" : "hide"}>
                <RichCell
                    disabled
                    before={<Icon56UserCircleOutline width={72} height={72} />}
                    caption={config.specialty}
                >
                    {config.fullName}
                </RichCell>
                {config.place && (
                    <Cell
                        disabled
                        before={<Icon28PlaceOutline />}
                        description={config.place}
                    >
                        Место проживания
                    </Cell>
                )}
                <Cell
                    description="05.04.2004"
                    disabled
                    before={<Icon28CalendarOutline />}
                    indicator={`${config.age} ${utils.string.declOfNum(
                        config.age,
                        ["год", "года", "лет"]
                    )}`}
                >
                    День рождения
                </Cell>
                {config.phone && (
                    <Cell
                        description={config.phone}
                        disabled
                        before={<Icon28PhoneOutline />}
                    >
                        Номер телефона
                    </Cell>
                )}
                {config.email && (
                    <Cell
                        description={config.email}
                        disabled
                        before={<Icon28MailOutline />}
                    >
                        E-Mail
                    </Cell>
                )}
            </Group>

            <Group mode="plain">
                {config.salary && (
                    <MiniInfoCell before={<Icon20MoneyCircleOutline />}>
                        {`Желаемая зарплата: ${config.salary}`}
                    </MiniInfoCell>
                )}
                {config.readyForBusinessTrips !== undefined && (
                    <MiniInfoCell before={<Icon20GlobeOutline />}>
                        {`Готовность к командировкам: ${
                            config.readyForBusinessTrips ? "Да" : "Нет"
                        }`}
                    </MiniInfoCell>
                )}
                {config.employment && (
                    <MiniInfoCell before={<Icon20NotebookCheckOutline />}>
                        {`Занятость: ${config.employment}`}
                    </MiniInfoCell>
                )}
                {config.workSchedule && (
                    <MiniInfoCell before={<Icon20CalendarOutline />}>
                        {`График работы: ${config.workSchedule}`}
                    </MiniInfoCell>
                )}
                {config.citizenship !== undefined && (
                    <MiniInfoCell before={<Icon20GovernmentOutline />}>
                        {`Гражданство: ${config.citizenship}`}
                    </MiniInfoCell>
                )}
                {config.languages && (
                    <MiniInfoCell before={<Icon20HieroglyphCharacterOutline />}>
                        {`Языки: ${config.languages.join(", ")}`}
                    </MiniInfoCell>
                )}
            </Group>
        </Group>
    );
};

export default Portfolio;
