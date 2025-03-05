import { Card, CardBody, Image, Pagination } from "@nextui-org/react";
import { IMidia, statusByMidiaColor } from "../../data/midia";
import { imageModified } from "../../utils/utils";

interface GridMidiaProps {
    items: any[],
    page: number,
    pages: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setMidiaSelected: React.Dispatch<React.SetStateAction<IMidia>>,
    onOpen: any,
    pageTopRef: React.RefObject<HTMLDivElement>
}

export const GridMidiaComponent = ({
    items,
    pages,
    page,
    setPage,
    setMidiaSelected,
    onOpen,
    pageTopRef
}: GridMidiaProps) => {
    return (<>
        <div className="grid pt-4" >
            <div className="grid sm-app:grid-cols-2 sm-app:grid-cols-3 ml-app:grid-cols-4 lg-app:grid-cols-6 lg-app:grid-cols-10 xl-app:grid-cols-10 xl-app:grid-cols-12 gap-2">
                {items.map((item: any, index: number) => (
                    <Card
                        key={`${index}_card`}
                        isFooterBlurred
                        radius="lg"
                        className="border-none"
                        isPressable
                        onPress={() => {
                            setMidiaSelected(item);
                            onOpen();
                        }}>
                            <CardBody className="overflow-visible p-0">
                        <Image
                            removeWrapper
                            key={`image_modal_${item?.id}`}
                            className="z-0 w-full h-full object-cover"
                            width='180px'
                            height='240px'
                            src={imageModified(item?.img)}
                        />
                        <div className="content">
                            <div className="consensus tight">
                                <div className="outer_ring">
                                    {
                                        statusByMidiaColor(item) === 'C' &&
                                        <div className="absolute bg-green-500 top-0 right-0 rounded-full p-3 m-2 shadow-sm w-6 h-6" />
                                    }
                                    {
                                        statusByMidiaColor(item) === 'O' &&
                                        <div className="absolute bg-orange-500 top-0 right-0 rounded-full p-3 m-2 shadow-sm w-6 h-6" />
                                    }
                                </div>

                            </div>
                            <h2>
                                {(item.subtitle ?? item.publicationTitle) ?? item?.title}
                            </h2>
                            <p>{item.year}</p>
                        </div>
                        </CardBody>
                    </Card>

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
                    onChange={(e) => {
                        setPage(e);
                        pageTopRef.current?.scrollIntoView();
                    }}
                />
            </div>
        </div>
    </>)
}