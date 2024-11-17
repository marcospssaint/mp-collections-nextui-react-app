import { Card, CardFooter, Image, Pagination } from "@nextui-org/react";
import { IMidia } from "../../data/midia";
import { imageModified, textMidia } from "../../utils/utils";

interface GridMidiaProps {
    items: any[],
    page: number,
    pages: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setMidiaSelected: React.Dispatch<React.SetStateAction<IMidia>>,
    onOpen: any
}

export const GridMidiaComponent = ({
    items,
    pages,
    page,
    setPage,
    setMidiaSelected,
    onOpen
}: GridMidiaProps) => {

    /* const cardOld = () = <Card
        key={index}
        isPressable
        onPress={() => {
            setMidiaSelected(item);
            onOpen();
        }} style={{ 'height': 310 }}>
        <CardBody className="overflow-visible py-2 my-8" style={{ 'height': 240 }}>
            <Image
                isBlurred
                isZoomed
                width={150}
                height={220}
                alt={item.title}
                src={imageModified(item.img)} />
        </CardBody>
        <Divider />
        <CardFooter className="text-small">
            <div>
                <p className="text-inherit">{textMidia(item.title)}</p>
                <p className="text-default-500">{textMidia(item.subtitle ?? item.publicationTitle ?? item.originalTitle)}</p>
                <p className="text-default-500">{item?.year}</p>
            </div>
        </CardFooter>
    </Card> */

    return (<>
        <div className="grid pt-4" >
            <div className="grid sm-app:grid-cols-2 sm-app:grid-cols-3 ml-app:grid-cols-4 lg-app:grid-cols-6 lg-app:grid-cols-10 xl-app:grid-cols-10 xl-app:grid-cols-12 gap-2">
                {items.map((item: any, index: number) => (
                    <div key={`${index}_card`} className="p-1">
                        <Card
                            isFooterBlurred
                            radius="lg"
                            className="border-none"
                            isPressable
                            onPress={() => {
                                setMidiaSelected(item);
                                onOpen();
                            }}
                        >
                            <Image
                                key={`image_modal_${item?.id}`}
                                className="rounded shadow-md w-full h-auto object-cover"
                                width='100%'
                                height='auto'
                                src={imageModified(item?.img)}
                            />
                            <CardFooter className="justify-between py-1 absolute bottom-1 ml-1 z-10" style={{
                                background: 'linear-gradient(180deg,transparent,rgba(0,0,0,.8))'
                            }}>
                                <div >
                                    <span style={{ color: 'rgb(255 255 255/var(--tw-text-opacity,1))', fontSize: '.875rem', fontWeight: 400 }}>{item.year} ·  {textMidia(item.title)}</span>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
            <div className="flex flex-cols w-full justify-center gap-4 py-2">
                <Pagination
                    isCompact
                    radius="full"
                    siblings={0}
                    showControls
                    showShadow
                    color="primary"
                    variant="light"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
            </div>
        </div>
    </>)
}