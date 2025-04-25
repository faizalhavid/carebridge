import 'package:carousel_slider/carousel_slider.dart';
import 'package:expandable_page_view/expandable_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:loader_overlay/loader_overlay.dart';
import 'package:my_chauffeur_driver/features/history/ui/widget/history_order_item.dart';
import 'package:my_chauffeur_driver/features/home/bloc/home_cubit.dart';
import 'package:my_chauffeur_driver/features/notification/ui/page/notification_page.dart';
import 'package:my_chauffeur_driver/features/order/model/work_order.dart';
import 'package:my_chauffeur_driver/features/order/ui/page/order_detail_page.dart';
import 'package:my_chauffeur_driver/features/tracking/bloc/tracking_cubit.dart';
import 'package:my_chauffeur_driver/features/withdraw/ui/widget/income_summary_widget.dart';
import 'package:my_chauffeur_driver/features/home/ui/widget/notification_button.dart';
import 'package:my_chauffeur_driver/features/order/ui/widget/order_list_item_widget.dart';
import 'package:my_chauffeur_driver/shared/bloc/state_controller.dart';
import 'package:my_chauffeur_themes/my_chauffeur_themes.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late final HomeCubit _homeCubit;

  @override
  void initState() {
    super.initState();
    _homeCubit = context.read<HomeCubit>()..init();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<HomeCubit, StateController<List<WorkOrder>>>(
      bloc: _homeCubit,
      listener: (context, state) {
        if (state is Loading) {
          context.loaderOverlay.show();
        } else {
          context.loaderOverlay.hide();
        }
      },
      builder: (context, state) {
        if (state is Error) {
          if ((state as Error).code == 406) {
            return Center(
              child: Text(
                "You need to fill your profile first",
                style: appFonts.primary.error.bold.ts,
              ),
            );
          } else {
            return Text(state.inferredErrorMessage!, style: appFonts.error.ts);
          }
        }
        if (state is Loading) {
          return const Center(child: CircularProgressIndicator());
        }
        if (state is Success) {
          return SingleChildScrollView(
            child: Stack(
              children: [
                SvgPicture.asset(
                  "assets/images/image_home_background.svg",
                  width: MediaQuery.of(context).size.width,
                  fit: BoxFit.cover,
                  alignment: Alignment.topCenter,
                ),
                SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 20,
                      vertical: 20,
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Image.asset(
                          "assets/icons/ic_logo.png",
                          width: 120,
                          fit: BoxFit.contain,
                        ),
                        NotificationButton(
                          onPressed: () {
                            Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (context) => const NotificationPage(),
                              ),
                            );
                          },
                        ),
                      ],
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 200),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.max,
                    children: [
                      Container(
                        width: MediaQuery.of(context).size.width,
                        decoration: BoxDecoration(
                          color: appColors.primary,
                          borderRadius: const BorderRadius.only(
                            topLeft: Radius.circular(20),
                            topRight: Radius.circular(20),
                          ),
                        ),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const SizedBox(height: 100),
                            _buildCarouselHero(),
                            const SizedBox(height: 20),
                            // // TODO: uncomment this line
                            // AppButton(
                            //   isFitParent: true,
                            //   onTap: () {
                            //     context
                            //         .read<TrackingCubit>()
                            //         .startTracking(-99);
                            //   },
                            //   text: "test tracking",
                            //   textStyle: appFonts.primary.bold.ts,
                            //   color: appColors.white,
                            // ),
                            // AppButton(
                            //   isFitParent: true,
                            //   onTap: () {
                            //     context.read<TrackingCubit>().stopTracking(-99);
                            //   },
                            //   text: "stop tracking",
                            //   textStyle: appFonts.primary.bold.ts,
                            //   color: appColors.white,
                            // ),
                            // const SizedBox(height: 20),
                            _buildCarouselOrder(
                              state.inferredData!
                                  .where(
                                    (element) =>
                                        element.order.statusOrder.id != 18,
                                  )
                                  .toList(),
                            ),
                          ],
                        ),
                      ),
                      ..._buildHistoryOrder(
                        state.inferredData!
                            .where(
                              (element) => element.order.statusOrder.id == 18,
                            )
                            .toList(),
                      ),
                    ],
                  ),
                ),
                const Positioned(
                  top: 170,
                  right: 0,
                  left: 0,
                  child: IncomeSummaryWidget(),
                ),
              ],
            ),
          );
        }
        return const SizedBox();
      },
    );
  }

  Widget _buildCarouselHero() {
    return CarouselSlider(
      options: CarouselOptions(height: 200),
      items:
          [1, 2, 3, 4, 5].map((i) {
            return Builder(
              builder: (BuildContext context) {
                return Container(
                  height: 100,
                  margin: const EdgeInsets.symmetric(horizontal: 10),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  clipBehavior: Clip.antiAlias,
                  child: Image.asset(
                    "assets/images/image_hero_banner.png",
                    height: 100,
                    fit: BoxFit.cover,
                  ),
                );
              },
            );
          }).toList(),
    );
  }

  Widget _buildCarouselOrder(List<WorkOrder> orders) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  "Driver Assigned",
                  style: appFonts.subtitle.bold.white.ts,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),
        if (orders.isEmpty)
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
            child: Text(
              "You have no order available",
              style: appFonts.bold.white.ts,
            ),
          ),
        if (orders.isNotEmpty)
          ExpandablePageView.builder(
            itemCount: orders.length,
            itemBuilder:
                (context, index) => Container(
                  margin: const EdgeInsets.symmetric(horizontal: 20),
                  child: OrderListItemWidget(
                    order: orders[index].order,
                    bottomWidget: AppButton(
                      isFitParent: true,
                      onTap: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder:
                                (context) => OrderDetailPage(
                                  orderId: orders[index].order.orderId,
                                  workOrderId: orders[index].id,
                                ),
                          ),
                        );
                      },
                      text: "View Detail",
                      textStyle: appFonts.primary.bold.ts,
                      color: appColors.white,
                    ),
                  ),
                ),
          ),
      ],
    );
  }

  List<Widget> _buildHistoryOrder(List<WorkOrder> orders) {
    return [
      Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Row(
          children: [
            Text("Order History", style: appFonts.subtitle.bold.primary.ts),
            const Spacer(),
            IconButton(
              onPressed: () {},
              icon: Icon(
                Icons.arrow_right_alt_rounded,
                color: appColors.primary,
              ),
            ),
          ],
        ),
      ),
      const SizedBox(height: 20),
      if (orders.isEmpty)
        Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
            child: Text(
              "You have no order history",
              style: appFonts.bold.primary.ts,
            ),
          ),
        ),
      for (var order in orders) ...[
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: HistoryOrderItem(
            order: order.order,
            onTap:
                () => Navigator.of(context).push(
                  MaterialPageRoute(
                    builder:
                        (context) => OrderDetailPage(
                          orderId: order.order.orderId,
                          workOrderId: order.id,
                        ),
                  ),
                ),
          ),
        ),
        const SizedBox(height: 20),
      ],
    ];
  }
}
